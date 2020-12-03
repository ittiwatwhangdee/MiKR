
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

        const eiei = `
        <ons-row class="rowmagin se" id="${doc.data().name}"> 
        <ons-row style="margin: 5px;">
            <ons-col class="text-center">
            <img src="${doc.data().poster}" width="80%" style="margin: 5px 5px;" alt="">
            </ons-col>
        <ons-col>
            <p style="font-size:18px">${doc.data().name} (${doc.data().years}) </p>
            <p style="font-size:15px">${doc.data().plot}</p>
            <p style="font-size:15px">`+ star +`</p>
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

// function getfromSearch() {
           
//             $("#search").click(function () {
//            $("#search_show").empty();
//            $("#sug_show").empty();
//            $("#search_show").append("");
//            var search_input = document.getElementById("search_input").value;
//            console.log(search_input);
         
//            db.collection("search").get().then((querySnapshot) => {
         
//              querySnapshot.forEach((doc) => {
//             if (`${doc.data().star}`>4){
//                 var star = `
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>`
//             }else if(`${doc.data().star}`>3){
//                 var star = `
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>`
//             }else if(`${doc.data().star}`>2){
//                 var star = `
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>`
//             }else if(`${doc.data().star}`>1){
//                 var star = `
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>`
//             }else{
//                 var star = `
//                 <ons-icon style="color: red" icon="fa-star"></ons-icon>`
         
//             }
         
//                var titleforcheck = `${doc.data().name}`;
//                // console.log(titleforcheck);
//                var yearforcheck = `${doc.data().years}`;
//                // console.log(yearforcheck);
         
//                var regexNumber = /\d/;
//                var regexLetter = /[a-zA-z]/;
         
//                if (regexLetter.test(search_input)) {
         
//                  if (titleforcheck.indexOf(search_input) != -1) {
//                    var row = `
//                    <ons-row style="margin: 5px;">
//                    <ons-col class="text-center">
//                    <img src="${doc.data().poster}" width="70%" style="margin: 5px 5px;" alt="">
//                    </ons-col>
           
//                    <ons-col>
//                    <p style="font-size:18px">${doc.data().name} (${doc.data().years}) </p>
//                    <p style="font-size:15px">${doc.data().plot}</p>
//                    <p style="font-size:15px">`+ star +`</p>
//                    </ons-col>
                 
//                    </ons-row>`
         
         
//                  }
         
         
//                } else if (regexNumber.test(search_input)) {
         
//                  if (search_input == yearforcheck) {
//                    var row = `
//                    <ons-row style="margin: 5px;">
//                    <ons-col class="text-center">
//                    <img src="${doc.data().poster}" width="80%" style="margin: 5px 5px;" alt="">
//                    </ons-col>
           
//                    <ons-col>
//                    <p style="font-size:10px">${doc.data().name} (${doc.data().years}) (${doc.data().years})</p>
//                    </ons-col>
                 
//                    </ons-row>`
         
//                  }
            
//                } else {
//                  $("#search_show").empty();
//                  $("#search_show").append("");
         
//                }
         
//                $("#search_show").append(row);
         
//              });
         
//            });
         
//          });

//         }
        
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

  

