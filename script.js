const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const dataContainer = data.data;
    const tabContainer = document.getElementById('tab-container');
    dataContainer.forEach(datas => {
        const div = document.createElement('div');
        div.classList = (`border-2 rounded`);
        div.innerHTML = `<a onclick="showVideo('${datas.category_id}')" class="tab">${datas.category}</a>`
        tabContainer.appendChild(div)
    })

}
const showVideo = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const dataContainer = data.data;
    const VideoCardContainer = document.getElementById('video-card');
    VideoCardContainer.textContent = ''

    if (dataContainer.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `<img src="Icon.png" alt="">
        <p class="text-center font-semibold md:text-4xl">Oops!! Sorry, There is no content here</p>`;
        VideoCardContainer.appendChild(div);
        div.classList = `md:absolute lg:top-1/4 md:left-1/4 lg:left-1/3`
    }
    dataContainer.forEach(datas => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="card  bg-base-100 shadow-xl">
    <figure class="relative"><img class="w-[300px] h-[200px] opacity-80 bg-black" src="${datas.thumbnail}" alt="video" />
    <p class="absolute bottom-4 right-10  text-white font-bold">${datas.others?.posted_date} </p>
    </figure>
    <div class=" mt-5 flex">
        <div>
            <img class=" w-20 h-20 rounded-full px-2 py-2 ml-2" src="${datas.authors[0].profile_picture}"/>
            </div>
      <div class="">
        <h2 class="card-title">${datas.title}</h2>
        <div class="flex"> <p>${datas.authors[0].profile_name}</p> &nbsp;
        <p>${datas.authors[0].verified ? '<img style="width:20px; height:20px; " src="Group.png">' : ''} </p> </div>
        <p>${datas.others.views} views</p>
        </div>
    </div>
    </div>`;



        VideoCardContainer.appendChild(div);
    })
}
loadData()