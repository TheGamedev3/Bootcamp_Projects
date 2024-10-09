console.log("Let's get this party started!");

function addGif(res) {
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
async function start(){
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
        q: "whale",
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });

    console.log(response);

    addGif(response.data);
}
start();