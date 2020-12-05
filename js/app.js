
var firebaseConfig = {
  apiKey: "AIzaSyDfhrdduWlyXKdyA4DOgfQYZQoJDG4qPHM",
  authDomain: "mikr-87f57.firebaseapp.com",
  projectId: "mikr-87f57",
  storageBucket: "mikr-87f57.appspot.com",
  messagingSenderId: "429837689513",
  appId: "1:429837689513:web:14c3b4b988a2f87f32bfb8",
  measurementId: "G-W38T1G7R57"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();


//App logic.
firebaseConfig.auth().onAuthStateChanged(function (user){
  if(user){
    //User is signed in.
    //var displayName = user.displayName;
    var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var ata = user.providerData;

    console.log(email);
    displayName = user.displayName;
    protoUrl = user.photoURL;
    console.log(displayName,email,photoUrl);

    document.querySelector('#myNavigator').replacePage('home.html');
  }else{
    document.querySelector('#myNavigator').releacePage('login.html');
  }
});


document.addEventListener("prechange", function(event){
  if(event.tebItem){
    document.querySelector(
      "ons-toolbar .center title bg-title"
    ).innerHTML = event.tebItem.getAttribute("label");
  }
});


document.addEventListener('init', function(event){
  var page = event.target;
  console.log(page.id);

  document.addEventListener('init', function (event){
    firebase.auth().signOut().then(function (){
      //Sign-out successful.
    }).catch(function (error){
      //An error happened.
    })
  })
})
// Home
$(function() {
    document.addEventListener('init', function(event) {
        var page = event.target;
        console.log(page.id);
        if (page.id === 'Home') {
            $('#back').hide();
            page.querySelector('#่exolightstick').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail.html');
            };
            page.querySelector('#jaehyunposcard').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail2.html');
            };
            page.querySelector('#btsmemories').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail3.html');
            };
            page.querySelector('#blackpinkticket').onclick = function() {
              document.querySelector('#myNavigator').pushPage('views/detail4.html');
          };
        } else if (page.id === '่exolightstick' || page.id === 'jaehyunposcard' || page.id === 'btsmemories' || page.id === 'blackpinkticket') {
            $('#back').show();
            document.querySelector('ons-back-button').onclick = function(event) {
                document.querySelector('#myNavigator').popPage();
            };
        }else if (page.id === "search1") {
          getEntertainment();
      } 
    });
})

function openproductDetails(id) {
    document.querySelector('#myNavigator').pushPage('product_details.html', {data: {title: id}});
  }

  function goBack() {
    document.querySelector('#menu').close().then(function() {
      document.querySelector('#myNavigator').popPage()
    });
  }


  // Search
 function getfromSearch() {

  const searchText = $("#searchInput").val()
  const newsearchText = searchText.replace(/ /g, "");

  $("#searchItem").empty();
  db.collection("search").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      const productname = doc.data().name;
      const newproductname = productname.replace(/ /g, "");
      console.log(newproductname);
      if (newproductname.toLowerCase().indexOf(newsearchText.toLowerCase()) != -1) {
        if (`${doc.data().star}`== 5) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
          
        }
        else if (`${doc.data().star}`== 4) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
        }

        else if (`${doc.data().star}` == 3) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
        }

        else if (`${doc.data().star}` == 2) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
        }else{
          var star = `
          <ons-icon style="color: red" icon="fa-star"></ons-icon>`
   
      }

        const result = `
        <ons-row class="rowmagin se" id="${doc.data().name}"> 
        <ons-row style="margin: 5px;">
            <ons-col class="text-center">
            <img src="${doc.data().poster}" width="75%" style="margin: 5px 5px;" alt="">
            </ons-col>
        <ons-col>
            <p style="font-size:18px">${doc.data().name} (${doc.data().years}) </p>
            <p class="detail_search">${doc.data().plot}</p>
            <p style="font-size:15px">`+ star +`</p>
            </ons-col>
      </ons-row>`
      
        console.log(doc.data());
        $("#searchItem").append(result)
      }
    });
    $(".se").click(function () {
      product_detials($(this).attr('id'))
      document.querySelector("#myNavigator_search").pushPage('view/product_details.html');
    })
  });

}

// Search by Entertainment
function getEntertainment() {
  $("ons-carousel-item button").click(function () {
      $("#searchResult").val("")
      $("#searchItem").empty();
      const targetEntertainment = $(this).attr('id')
      db.collection("product").get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              const Entertainment = doc.data().entertainment
              if (Entertainment.includes(targetEntertainment)) {
                  const result =
                      /*html*/
                      `
                      <div class="row">
                      <div class="column">
                      <img src="${doc.data().posterURL}" style="width:100%">
                      </div>
                      </div>
                      
                      `
                  $("#searchItem").append(result);
              }
          });
          $(".imgSrc").click(function () {
              const productTarget = $(this).attr('id');
              getmovieDetailSrc(productTarget)
              document.querySelector("#Navigator_search").pushPage("views/product_details.html");
          });
      });
  })
}


// Tab
window.fn = {};

  window.fn.open = function() {
    var menu = document.getElementById('menu');
    menu.open();
  };
  
  window.fn.load = function(page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
      .then(menu.close.bind(menu));
  };
