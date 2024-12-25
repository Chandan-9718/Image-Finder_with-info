const ACCESS_TOKEN = "6uo1e1wTwF5cLKcOkp9MUqX7w6i1FblYLDFFmf_VFZI";
let keyword = document.getElementById("keyword");
let val;
let page = 1;

document.getElementById("btn").addEventListener("click", () => {
  page = 1;
  document.getElementById("allimg").innerHTML = "";
  val = keyword.value;
  keyword.value = "";
  fetchImg(val);
});
async function fetchImg(val) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?query=${val}&client_id=${ACCESS_TOKEN}&page=${page}`
  );
  let result = await response.json();
//   console.log(result);
  if (result.results.length < 1) {
    console.log("jai shree ram");
    document.getElementById("allimg").innerHTML =
      "<h1>No images found. Please try another keyword.</h1>";
  } else {
    displayImg(result);
  }
}
function displayImg(res) {
  res.results.map((data) => {
    // console.log(data);
    let div = document.createElement("div");
    div.setAttribute("class", "singleimg");
    // console.log(div);
    // console.log(1);
    div.innerHTML = `
                        <div class="firstdiv">
                           <img
                              src="${data.user.profile_image.large}"
                              alt=""
                              class="userimg"
                           />
                           <p class="username">${data.user.name}</p>
                        </div>
                        <div class="seconddiv">
                           <a href="${data.links.html}" target="_blank">
                                <img
                                  src="${data.urls.regular}"
                                  alt=""
                                  class="mainimg"
                                />
                            </a>
                           <p class="imgdec">${data.alt_description}</p>
                        </div>
                    `;
    document.getElementById("allimg").appendChild(div);
  });

  document.getElementById("lodemore").classList.add("visible");
}

document.getElementById("lodemore").addEventListener("click", () => {
  // console.log("lodemorebtn");
  page++;
  fetchImg(val);
});

