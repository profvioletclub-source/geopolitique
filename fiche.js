const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');

Promise.all([
  fetch('europe.json').then(res => res.json()),
  fetch('europe1.json').then(res => res.json()),
  fetch('europe2.json').then(res => res.json()),
  fetch('europe3.json').then(res => res.json()),
  fetch('europe4.json').then(res => res.json())
])
.then(allData => {
  const data = allData.flat();
  const country = data.find(c => c.name === countryName);

  if (!country) {
    document.getElementById('fiche').innerHTML = "<p>Pays introuvable.</p>";
    return;
  }

  document.getElementById('fiche').innerHTML = `
    <div class="pays">
      <h2> 🇺🇳 ${country.name}</h2>
      <img src="${country.flag}" width="100"><br>
      <ul>
        <li><strong>Capitale :</strong> ${country.capital}</li>
        <li><strong>Population :</strong> ${country.population.toLocaleString()}</li>
        <li><strong>Monnaie :</strong> ${country.currency}</li>
        <li><strong>IDH :</strong> ${country.idh}</li>
        <li><strong>Organisations :</strong> ${country.organizations.join(', ')}</li>
        <li><strong>Chef de l'État :</strong> ${country.headofstate}</li>
      </ul>
      <a href="index.html">← Retour à la liste</a>
    </div>
  `;
})
.catch(err => {
  console.error("Erreur :", err);
  document.getElementById('fiche').innerHTML = "<p>Erreur de chargement.</p>";
});
