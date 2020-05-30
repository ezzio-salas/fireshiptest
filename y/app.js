
document.addEventListener("DOMContentLoaded",event => {
    const app = firebase.app();
    try{
        const serApp=JSON.stringify(app);
    }
    catch(err){
        serApp='';
    }
    console.log(`%c FIREBASE UP ${serApp}`,`color:yellow;background-color:red;`);
    // console.log(`%c HEY MORRO FIREBASE IS UP ${ try{JSON.stringify(app)} catch(err){console.log(err);}}`,`font-size:30px;color:yellow;background-color:#dark`);
    console.table(app);

    const db = firebase.firestore();

    const mypost = db.collection('post').doc('myfirstpost');

    /*mypost.get().then(doc => {

        const data = doc.data();
        document.write(data.title+' <br>');
        document.write(data.createdAt);
    })
    */

    mypost.onSnapshot(doc=>{
            const data = doc.data();
            document.getElementById('titleIdcontent').innerHTML=`${data.title}<br> `;
            // document.write(`${data.title} <br>`);
            // document.write(`${data.createdAt}<br>`);    
        })


        const prod = db.collection('products');
        
        const query = prod.where('price','>=',10)

        query.get().then(
             products => {
                products.forEach(doc => {
                    data= doc.data();
                    document.getElementById('productList').innerHTML=`${data.name} cost ${data.price}`;
                })
             }
        )

    
});


function googleLogin(){

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(res => {
        const user = res.user;
        document.write(`HEY BITCH ${user.displayName}`);
        console.log(user);

    }).cath(console.log)

}


function updatePost(d) {
    const db = firebase.firestore();
    const myUpdate = db.collection('post').doc('myfirstpost');
    myUpdate.update({title:d.target.value})
}