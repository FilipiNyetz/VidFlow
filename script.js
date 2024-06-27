const containerVideos= document.querySelector(".videos__container");

async function buscarEMostrarVideos(){
    try{
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();

            videos.forEach((video)=> {
                if(video.categoria == ""){
                    throw new Error('Vídeo não tem categoria');
                }
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <span class="categoria-video">${video.categoria}</span>
                        
                    </div>
                </li>
                `;
            })
    } catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}
buscarEMostrarVideos()

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item");
    const valorFiltro = barraDePesquisa.value.toLocaleLowerCase();

    if (valorFiltro !== "") {
        videos.forEach(video => {
            let titulo = video.querySelector(".titulo-video").textContent.toLocaleLowerCase();

            if (!titulo.includes(valorFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        });
    } else {
        videos.style.display="block";
    }
}

function filtrarCategorias(event, categoria) {
    event.preventDefault(); // Impede a navegação padrão do link
    console.log(`O topico selecionado foi ${categoria}`)

    const videos = document.querySelectorAll(".videos__item");

    videos.forEach(video => {
        const categoriaElement = video.querySelector(".categoria-video");
        if (categoria === 'Tudo') {
            video.style.display = "block"; // Mostra todos os vídeos
        } else if (categoriaElement) {
            let categoriaVideo = categoriaElement.textContent;

            if (!categoriaVideo.includes(categoria)) {
                video.style.display = "none"; // Esconde os vídeos que não correspondem à categoria
            } else {
                video.style.display = "block"; // Mostra os vídeos que correspondem à categoria
            }
        }
    });
}


