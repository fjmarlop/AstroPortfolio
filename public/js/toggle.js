window.toggleLista = function (id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('hidden');
  }
}

window.cargarContenido = async function (categoria, slug) {
  const contenidoEl = document.getElementById('contenido');

  try {
    const res = await fetch(`/data/${categoria}/${slug}.json`);
    if (!res.ok) throw new Error('No se pudo cargar el JSON');

    const data = await res.json();

    const htmlRes = await fetch(data.html);
    if (!htmlRes.ok) throw new Error('No se pudo cargar el HTML');

    const html = await htmlRes.text();

    const cabeceraHTML = generarCabecera(categoria, data);

    contenidoEl.innerHTML = `
      ${cabeceraHTML}
      ${html}
    `;
  } catch (e) {
    contenidoEl.innerHTML = `<p class="text-red-500">Contenido no encontrado</p>`;
    console.error(e);
  }
};

function generarCabecera(categoria, data) {
  switch (categoria) {
    case 'ctfs':
      return `
        <h1 class="text-white text-2xl mb-4 text-center">${data.title}</h1>
        <section class="w-full md:w-2/3 mx-auto bg-neutral-900 bg-opacity-50 rounded-lg flex flex-col md:flex-row p-4">
          <div class="hidden md:block">
            <img src="/img/${data.slug}/${data.slug}.png" class="rounded-lg p-4 object-contain"
              style="max-width: 200px; max-height: 200px;" alt="Imagen CTF">
          </div>
          <div class="flex flex-col justify-center text-green-500 md:ml-6 text-lg">
            <span class="p-2 md:p-3">
              Plataforma:
              <a href="${data.enlacePlataforma}" target="_blank"
                class="hover:text-lime-400 no-underline">
                ${data.plataforma}
              </a>
            </span>
            <span class="p-2 md:p-3">Dificultad: ${data.dificultad}</span>
            <span class="p-2 md:p-3">Fecha de resolución: ${data.fecha}</span>
          </div>
        </section>
      `;

    case 'tools':
      return `
        <h1 class="text-2xl mb-4 text-center">${data.title}</h1>
      `;

    case 'tecnicas':
      return `
        <h1 class="text-2xl font-bold mb-4 text-center">${data.title}</h1>
      `;

    default:
      return `<h1 class="text-white text-2xl mb-4 text-center">${data.title}</h1>`;
  }
}



