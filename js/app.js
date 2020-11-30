$(function(){
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
})

$(function() {
    document.addEventListener('init', function(event) {
        var page = event.target;

        console.log(page.id);
        if (page.id === 'Home') {
            $('#back').hide();
            page.querySelector('#johnwick').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail.html');

            };
            page.querySelector('#wonderwoman').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail2.html');
            };
            page.querySelector('#toystory').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/cart.html');
            };
        } else if (page.id === 'johnwick' || page.id === 'wonderwoman' || page.id === 'toystory') {
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



  
  $("#search").click(function () {
    console.log("1");
    
           
    $("#search_show").empty();
    $("#sug_show").empty();
    $("#search_show").append("");
    var search_input = document.getElementById("search_input").value;
    console.log(search_input);
  
    db.collection("search").get().then((querySnapshot) => {
  
      querySnapshot.forEach((doc) => {
  
        var nameforcheck = `${doc.data().name}`;
        // console.log(titleforcheck);
        var priceforcheck = `${doc.data().price}`;
        // console.log(yearforcheck);
  
        var regexNumber = /\d/;
        var regexLetter = /[a-zA-z]/;
  
        if (regexLetter.test(search_input)) {
  
          if (nameforcheck.indexOf(search_input) != -1) {
            var row = `
            <ons-row style="margin: 5px;">
            <ons-col class="text-center">
            <img src="${doc.data().posterURL}" width="70%" style="margin: 5px 5px;" alt="">
            </ons-col>
    
            <ons-col>
            <p style="font-size:18px">${doc.data().name} (${doc.data().price}) </p>
            <p style="font-size:15px">${doc.data().entertainment}</p>
            <p style="font-size:15px">`+ rating +`</p>
            </ons-col>
          
            </ons-row>`
  
  
          }
  
  
        } else if (regexNumber.test(search_input)) {
  
          if (search_input == priceforcheck) {
            var row = `
            <ons-row style="margin: 5px;">
            <ons-col class="text-center">
            <img src="${doc.data().posterURL}" width="80%" style="margin: 5px 5px;" alt="">
            </ons-col>
    
            <ons-col>
            <p style="font-size:10px">${doc.data().name} (${doc.data().price}) (${doc.data().price})</p>
            </ons-col>
          
            </ons-row>`
  
          }
     
        } else {
          $("#search_show").empty();
          $("#search_show").append("");
  
        }
  
        $("#search_show").append(row);
  
      });
  
    });
  
  });
