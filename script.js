Promise.all([
  fetch('europe.json').then(res => res.json()),
  fetch('europe1.json').then(res => res.json()),
  fetch('europe2.json').then(res => res.json()),
  fetch('europe3.json').then(res => res.json()),
  fetch('europe4.json').then(res => res.json())
])
.then(allData => {
  const data = allData.flat(); // fusionne tous les tableaux en un seul
  const container = document.getElementById('countries');
  const searchInput = document.getElementById('search');
  const filters = document.querySelectorAll('#filters input');

  function renderCountries() {
    const query = searchInput.value.toLowerCase();
    const activeFilters = Array.from(filters)
      .filter(f => f.checked)
      .map(f => f.value);

    container.innerHTML = '';

    data.forEach(country => {
      const matchName = country.name.toLowerCase().includes(query);
      const matchOrg = activeFilters.length === 0 || activeFilters.every(org =>
        country.organizations.includes(org)
      );

      if (matchName && matchOrg) {
        const div = document.createElement('div');
        div.className = 'pays';
        div.innerHTML = `
          <h2>🇺🇳 ${country.name}</h2>
          <img src="${country.flag}" width="50"><br>
          <ul>
            <li><strong>Capitale :</strong> ${country.capital}</li>
            <li><strong>Population :</strong> ${country.population.toLocaleString()}</li>
            <li><strong>Monnaie :</strong> ${country.currency}</li>
            <li><strong>IDH :</strong> ${country.idh}</li>
            <li><strong>Organisations :</strong> ${country.organizations.join(', ')}</li>
          </ul>
        `;
        container.appendChild(div);
      }
    });
  }

  searchInput.addEventListener('input', renderCountries);
  filters.forEach(f => f.addEventListener('change', renderCountries));
  renderCountries();
})
.catch(err => {
  console.error("Erreur de chargement des fichiers JSON :", err);
  alert("Impossible de charger les données géopolitiques.");
});
