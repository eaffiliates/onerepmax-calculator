import{f as p}from"./formulas.DWyL16yr.js";function m(e){return[40,60,75,85,95].map(t=>e*(t/100))}function u(e,a){const t=document.getElementById("warmup-sets");if(!t)return;const n=m(e),s=[40,60,75,85,95],o=["Light warm-up","Moderate warm-up","Heavy warm-up","Opener","Near max"];t.innerHTML=n.map((d,r)=>`
      <div class="flex flex-col items-center py-4 px-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200">
        <span class="font-semibold text-gray-900 mb-2 text-center">${o[r]}</span>
        <span class="text-sm text-gray-600 mb-2">${s[r]}%</span>
        <span class="text-xl font-bold text-blue-600">${p(d,a==="kg")}</span>
      </div>
    `).join("")}window.addEventListener("updateWarmupLadder",e=>{u(e.detail.oneRM,e.detail.unit)});
