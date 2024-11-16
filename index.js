/* empty css                      */import{a as S,S as O,i as f}from"./assets/vendor-G7KkPL-b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const q="https://pixabay.com/api/",M="47109335-d0881509c7aa5eb4d0af96ec6";async function h(i,t=1,s=15){const l=new URLSearchParams({key:M,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:s,page:t}),{data:e}=await S.get(`${q}?${l}`);return e}function y(i){return i.map(({webformatURL:t,largeImageURL:s,tags:l,likes:e,views:o,comments:n,downloads:w})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img src="${t}" alt="${l}" width="360">
          </a>
          <ul class="gallery-description-list">
            <li class="gallery-description-item">
              <p class="gallery-description-headline">Likes</p>
              <p class="gallery-description-quantity">${e}</p>
            </li>
            <li class="gallery-description-item">
              <p class="gallery-description-headline">Views</p>
              <p class="gallery-description-quantity">${o}</p>
            </li>
            <li class="gallery-description-item">
              <p class="gallery-description-headline">Comments</p>
              <p class="gallery-description-quantity">${n}</p>
            </li>
            <li class="gallery-description-item">
              <p class="gallery-description-headline">Downloads</p>
              <p class="gallery-description-quantity">${w}</p>
            </li>
          </ul>
        </li>
        `).join("")}const L=new O(".gallery-link",{captionsData:"alt",captionDelay:250}),m=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),d=document.querySelector(".loader"),r=document.querySelector(".load-more");let a=1,g=15,c=0,u="";m.addEventListener("submit",$);r.addEventListener("click",C);async function $(i){if(i.preventDefault(),p.innerHTML="",r.disabled=!1,r.classList.replace("load-more","load-more-hidden"),a=1,u=i.target.elements.search.value.trim(),u.trim()===""){r.disabled=!0,r.classList.replace("load-more","load-more-hidden"),I();return}d.classList.replace("loader-on","loader"),h(u,a).then(t=>{if(d.classList.replace("loader","loader-on"),r.classList.replace("load-more-hidden","load-more"),t.hits.length===0){R(),r.classList.replace("load-more","load-more-hidden");return}m.reset(),p.insertAdjacentHTML("beforeend",y(t.hits)),a===1&&(c=t.totalHits),a*g>=c&&r.classList.replace("load-more-hidden","load-more"),console.log(c),c<g&&(r.classList.replace("load-more","load-more-hidden"),b()),L.refresh(),m.reset()}).catch(t=>alert(t.message)),p.innerHTML=""}async function C(){a+=1,r.disabled=!0,d.classList.replace("loader","loader-on");try{const i=await h(u,a);p.insertAdjacentHTML("beforeend",y(i.hits)),L.refresh(),r.disabled=!1;const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,left:0,behavior:"smooth"}),a*g>=c&&(r.disabled=!1,r.classList.replace("load-more","load-more-hidden"),b(),d.classList.replace("loader-on","loader"))}catch(i){f.show({message:`${i}`})}finally{r.disabled=!1,d.classList.replace("loader","loader-on")}}function b(){f.info({title:"We are sorry, ",message:"but you've reached the end of search results.",titleSize:"16px",position:"topRight",timeout:"5000",closeOnClick:"true",progressBarColor:"#fff",transitionIn:"bounceInDown",transitionOut:"fadeOutRight"})}function I(){f.warning({title:"Caution",message:"Search field cannot be empty!",titleSize:"16px",position:"topRight",timeout:"5000",closeOnClick:"true",progressBarColor:"#fff",transitionIn:"bounceInDown",transitionOut:"fadeOutRight"})}function R(){f.error({title:"Sorry, ",message:"there is no result for your request!",titleSize:"16px",position:"topRight",timeout:"5000",closeOnClick:"true",progressBarColor:"#fff",transitionIn:"bounceInDown",transitionOut:"fadeOutRight"})}
//# sourceMappingURL=index.js.map
