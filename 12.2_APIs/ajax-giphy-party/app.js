console.log("Let's get this party started!");

// add the gif
async function getGif(searchFor){
  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
      q: searchFor,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
  });

  console.log(response);
  const res = response.data;
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    console.log($newCol);
    $("#gif-row").append($newCol);
  }
}

// add a whale gif on start as an example
getGif("whale");

// get some of the input elements
const [clearBtn, gifybar] =
["clear", "gifybar"].map(
    id => document.getElementById(id)
);

// on click clear, clear the row
clearBtn.addEventListener("click",()=>{
  $("#gif-row").empty();
});

// on submit, search for it
gifybar.addEventListener("submit",(event => {
  event.preventDefault();
  const submitText = $("#gifSearch").val();
  getGif(submitText);
}));