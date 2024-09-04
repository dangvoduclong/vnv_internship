const test = () => {
  setTimeout(() => console.log(0));
  console.log(1);
  console.log(2);
  console.log(3);
};
test();

const httpGetAsync = (theUrl, callback) => {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp);
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
};

httpGetAsync("http://picsum.photos/200/300", (data) => {
  console.log("img1");
  console.log(data);
  document.getElementById("img1").setAttribute("src", data.responseURL);

  httpGetAsync("http://picsum.photos/200/300", (data) => {
    console.log("img2");
    console.log(data);
    document.getElementById("img2").setAttribute("src", data.responseURL);

    httpGetAsync("http://picsum.photos/200/300", (data) => {
      console.log("img3");
      console.log(data);
      document.getElementById("img3").setAttribute("src", data.responseURL);
    });
  });
});

//------------------------------------------------ PROMISE --------------------------------------------------
const currentPromise = new Promise((resolve, reject) => {
  let condition = true;
  condition
    ? setTimeout(() => {
        resolve("success");
      }, 3000)
    : reject("error");
});

currentPromise
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

const httpGetAsync2 = (theUrl, resolve) => {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(xmlHttp);
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
};

const currentPromise2 = new Promise((resolve, reject) => {
  httpGetAsync2("http://picsum.photos/200/300", resolve);
});

const currentPromise3 = new Promise((resolve, reject) => {
  httpGetAsync2("http://picsum.photos/200/300", resolve);
});

const currentPromise4 = new Promise((resolve, reject) => {
  httpGetAsync2("http://picsum.photos/200/300", resolve);
});

currentPromise2
  .then((data) => {
    console.log("img4");
    console.log(data);
    document.getElementById("img4").setAttribute("src", data.responseURL);
    return currentPromise3;
  })
  .then((data) => {
    console.log("img5");
    console.log(data);
    document.getElementById("img5").setAttribute("src", data.responseURL);
    return currentPromise4;
  })
  .then((data) => {
    console.log("img6");
    console.log(data);
    document.getElementById("img6").setAttribute("src", data.responseURL);
  })
  .catch((err) => console.log(err));

// ----------------------------------- ASYNC / AWAIT -------------------------------

const currentPromise7 = new Promise((resolve, reject) => {
  httpGetAsync2("http://picsum.photos/200/300", resolve);
});

const currentPromise8 = new Promise((resolve, reject) => {
  httpGetAsync2("http://picsum.photos/200/300", resolve);
});

const currentPromise9 = new Promise((resolve, reject) => {
  httpGetAsync2("http://picsum.photos/200/300", resolve);
});
const executeAsync = async () => {
  try {
    const response7 = await currentPromise7;
    console.log("img7");
    console.log(response7);
    document.getElementById("img7").setAttribute("src", response7.responseURL);

    const response8 = await currentPromise8;
    console.log("img8");
    console.log(response8);
    document.getElementById("img8").setAttribute("src", response8.responseURL);

    const response9 = await currentPromise9;
    console.log("img9");
    console.log(response9);
    document.getElementById("img9").setAttribute("src", response9.responseURL);
  } catch (error) {
    console.log(error);
  }
};

executeAsync();
// thuc thi tu tren xuong duoi ->>>> thuc hien bat dong bo nhu dong bo =)))
