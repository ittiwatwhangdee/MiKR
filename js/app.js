
var firebaseConfig = {
  apiKey: "AIzaSyAzvJ9RdYPrw_qrNCsMVpGi52c4Iqu6aao",
  authDomain: "mikr-app.firebaseapp.com",
  databaseURL: "https://mikr-app.firebaseio.com",
  projectId: "mikr-app",
  storageBucket: "mikr-app.appspot.com",
  messagingSenderId: "314836526430",
  appId: "1:314836526430:web:97e4577d431c7e23b79bcf",
  measurementId: "G-ZZ5FHQJFQG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


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
        } else if (page.id === '่exolightstick' || page.id === 'jaehyunposcard' || page.id === 'btsmemories') {
            $('#back').show();
            document.querySelector('ons-back-button').onclick = function(event) {
                document.querySelector('#myNavigator').popPage();
            };
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

 function getfromSearch() {

  const searchText = $("#searchInput").val()
  const newsearchText = searchText.replace(/ /g, "");

  $("#searchItem").empty();
  db.collection("product").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      const productname = doc.data().name;
      const newproductname = productname.replace(/ /g, "");
      console.log(newproductname);
      if (newproductname.toLowerCase().indexOf(newsearchText.toLowerCase()) != -1) {
        if (doc.data().rating > 9) {
          var rating = `
          <div class="starrate">
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
    
           <b style="font-size:x-large;color:green;text-align: right;">${doc.data().price}</b>
          `
        }
        else if (doc.data().rating >= 7 && doc.data().rating < 9) {
          var rating = `
          <div class="starrate">
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
    
          <b style="font-size:x-large;color:green;text-align:right;">${doc.data().price}</b>
          `
        }

        else if (doc.data().rating >= 4 && doc.data().rating < 7) {
          var rating = `
          <div class="starrate">
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
     
    
          <b style="font-size:x-large;color:orange;text-align:right;">${doc.data().price}</b>
          `
        }

        else if (doc.data().rating > 1 && doc.data().rating < 5) {
          var rating = `
          <div class="starrate">
          <ons-icon  icon="fa-star"></ons-icon>
          <ons-icon  icon="fa-star"></ons-icon>
            <b style="font-size:x-large;color:red;text-align:right;">${doc.data().price}</b>
          `
        }

        const eiei = `
        <ons-row class="rowmagin se" id="${doc.data().name}"> 
        <ons-col>
        <img src="${doc.data().posterURL}" style="width:90%;height:95%;">
           </div>
        </ons-col>
        <ons-col>
              <span class="list-item__title" style="font-family: 'Bebas Neue', cursive;font-size:18px;">${doc.data().name}</span><br>
              <span class="list-item__subtitle" style="font-family: 'Open Sans', sans-serif;font-size:12px;">"${doc.data().entertainment}"
                </span>
                 <p class="rating">Ratings</p>
                 + rating + 
              </ons-col>
      </ons-row>`
        console.log(doc.data());
        $("#searchItem").append(eiei)
      }
    });
    $(".se").click(function () {
      product_detials($(this).attr('id'))
      document.querySelector("#myNavigator_search").pushPage('view/product_details.html');
    })
  });

}


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

  

