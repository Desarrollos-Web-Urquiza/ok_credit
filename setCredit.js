const conex = require('../app/includes/conex')
const db = conex.firestore

let uid = "uid"




const getCredit = function(uid){
  



    return new Promise((resolve, reject) => {

        var docRef = db.collection("okcredits").doc(uid);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                let docu = doc.data()
                
                let credit = {
                        credit: docu.credit
                    }
               return resolve(credit)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            return reject()
        });

    }

}



module.exports = { getCredit }
