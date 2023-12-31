const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const dataContainer = data.data;
    const tabContainer = document.getElementById('tab-container');

    dataContainer.forEach(datas => {
        const div = document.createElement('div');
        div.innerHTML = `<a onclick="showVideo('${datas.category_id}')" class="tab border-2 active:bg-[#FF1F3D] !important rounded-lg ">${datas.category}</a>`
        tabContainer.appendChild(div);

        showVideo('1000');
    })

}

const showVideo = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const dataContainer = data.data;
    const videoCardContainer = document.getElementById('video-card');
    videoCardContainer.textContent = '';
    const emptySection = document.getElementById('empty');
    emptySection.textContent = '';

    if (dataContainer.length === 0) {
        const div = document.createElement('div');
        div.classList = `md:mt-10 lg:mt-24`
        div.innerHTML = `<div class="flex justify-center"><img src="Icon.png" alt=""></div>
        <p class="text-center font-semibold md:text-4xl">Oops!! Sorry, There is no content here</p>`;
        emptySection.appendChild(div);
    }
    dataContainer.forEach(datas => {
        const time = datas.others?.posted_date;
        const hours = Math.floor(time / 3600) + 'hrs'
        const mins = time % 3600;
        const min = Math.floor(mins / 60) + 'min ago';
        const div = document.createElement('div');
        div.innerHTML = `<div class="card  bg-base-100 shadow-xl">
    <figure class="relative"><img class="w-[300px] h-[200px] opacity-80 bg-black" src="${datas.thumbnail}" alt="video" />
    <p class="absolute bottom-1 right-8 bg-black font-semibold  text-white">${datas.others?.posted_date ? `${hours} ${min}` : ''}</p>
    </figure>
    <div class=" mt-5 flex">
        <div class="avatar ml-2">
        <div class=" w-20 rounded-full">
            <img  src="${datas.authors[0].profile_picture}"/>
            </div>
        </div>
      <div class="ml-5">
        <h2 class="card-title">${datas.title}</h2>
        <div class="flex"> <p>${datas.authors[0].profile_name}</p> &nbsp;
        <p>${datas.authors[0].verified ? '<img style="width:20px; height:20px; " src="Group.png">' : ''} </p> </div>
        <p class="card-views">${datas.others.views} views</p>
        </div>
    </div>
    </div>`;


        videoCardContainer.appendChild(div);

    })
}


const sortByViews = () => {
    const videoCardContainer = document.getElementById('video-card');
    const videoCards = Array.from(videoCardContainer.querySelectorAll('.card'));

    const sortedVideoCards = videoCards.sort((a, b) => {
        const aViews = parseInt(a.querySelector('.card-views').textContent);
        const bViews = parseInt(b.querySelector('.card-views').textContent);
        return bViews - aViews;
    });

    videoCardContainer.innerHTML = '';
    sortedVideoCards.forEach(videoCard => {
        videoCardContainer.appendChild(videoCard);
    });
};

loadData()





























