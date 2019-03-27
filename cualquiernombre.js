
	console.log("entra al JS")


	/*DATOS DE LA CONSOLA DE FIREBASE (FIRESTORE)*/
	firebase.initializeApp({
	  apiKey: 'AIzaSyCZnYsoQvXxt9A84Pmz2r2eZry2L8sZj0Y',
	  authDomain: 'prueba-d4545.firebaseapp.com',
	  projectId: 'prueba-d4545'
	});

	// Initialize Cloud Firestore through Firebase
	var db = firebase.firestore();


	/*

				//Agregar datos en Firebase (sirve para modificar también)
				db.collection("users").doc("hola mundo").set({//Si no existe la colección o el documento, te lo crea
				    first: "1º",
				    middle: "medio",
				    last: true,
				    born: 1100
				     
				})
		.then(function() {
		    console.log("Document written");
		    document.write("Datos subidos a la BD")

		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		    document.write("Ocurrió un error!")
		});
	*/




	/*		
			//Obtener registros en Firebase
			var docRef = db.collection("usuarios").doc("werner");

			docRef.get().then(function(doc) {
			    if (doc.exists) {
			        console.log("Document data:", doc.data());
			        var docu = doc.data() 
			        document.write(docu.algo)
			    } else {
			        // doc.data() will be undefined in this case
			        console.log("No such document!");
			    }
			}).catch(function(error) {
			    console.log("Error getting document:", error);
			});

	*/
	/*

			//Se crea una función para hacer una "transacción" es decir de la lectura y actualización en este caso de un campo de un documento.
			const cambiadorDeNacimiento = function() {

				// Se crea una referencia a la colección y al documento.
				var sfDocRef = db.collection("users").doc("loquesea");

				
				//Primera promesa que se encarga de la "transacción" es decir de la lectura y actualización en este caso.
				return db.runTransaction(function(transaction) {
				    // Segunda promesa anidada con la primera que se encarga de obtener el documento
				    return transaction.get(sfDocRef).then(function(sfDoc) {
				        if (!sfDoc.exists) {
				            throw "El documento no existe!";
				        }
				        //Aquí aumentamos el valor "born" del documento ya "obtenido" y se realiza la transacción
				        var aumentaNacimiento = sfDoc.data().born + 1;
				        transaction.update(sfDocRef, { born: aumentaNacimiento });
				    });
				}).then(function() {
				    console.log("La transacción se realizó con éxito!");
				}).catch(function(error) {
				    console.log("La transacción falló, porque: ", error);
				});

			}

			//Se invoca la función
			cambiadorDeNacimiento ()








			var sfDocRef = db.collection("users").doc("dfsdfdsf")

			sfDocRef.delete().then(function(sfDocRef) {
				
			    console.log("Documento eliminado!");
			}).catch(function(error) {
			    console.error("Error al eliminar el documento: ", error);
			});

	*/


	

		//Obtener creditos getCredit()
		const getCredit = function(params){
		  
		  return new Promise((resolve, reject) => {
				var docRef = db.collection("usuarios").doc("werner");

				docRef.get()

				.then(function(doc) {
				  
					    if (doc.exists) {
					        
					        var docu = doc.data() 
					        var docu = docu.credit

					        return resolve(docu)
					    } else {
					        // doc.data() will be undefined in this case
					        console.log("No such document!");
					    }
				

					}).catch(function(error) {
					    console.log("Error getting document:", error);
					});

			})
		}







		//oknube_suscriptions

		const getOrder = (params) => {
		  
		  return {amount: 14}
		}

		const procesOrder = (params) => {
		  console.log("Entró a la function procesOrder")
		  return {amount: 1000, data: params }

		  	
		}




		//processPayment
		const processPayment = (params) => {
		  return new Promise((resolve, reject) => {
		   
		   	var amount = getOrder().amount
		    
		    
			getCredit()
			    .then(credit => {
			      
					console.log(credit)
					if (amount <= credit) {

							let param = {
						    "operation": "-",
						    "uid": "werner",
						    "amount": amount
						  }

						  return resolve(param)

					}
					else
					{
					
						

						let response = {
						    "err": "insufficient credit",

						    
						  }

						  return resolve(response)

					}




			   })

		    
		    
		  })
		}










		//setCredit
		const setCredit = (param) => {
		  return new Promise((resolve, reject) => {
		   
		   	var uid = param.uid
		   	
		   	var amount = param.amount
		   	
		   	var operation = param.operation
			  
		    
			getCredit()
			    .then(credito => {
			      
					console.log(credito)
					if (operation == "+") {

							
						console.log("Entró por el true (aca lo está llamando addcredit)")


					}
					else
					{
						console.log("Entró por el false (aca lo está llamando processPayment)")
									
						var credito = credito - amount
						
						console.log(credito)


						
						var sfDocRef = db.collection("usuarios").doc(uid);

						

						return db.runTransaction(function(transaction) {
						    
						    return transaction.get(sfDocRef).then(function(sfDoc) {
						        if (!sfDoc.exists) {
						            throw "¡El documento no existe!";
						        }

						        var nuevoCredito = credito
						        transaction.update(sfDocRef, { credit: nuevoCredito });
						    });
						}).then(function() {
						    console.log("Se ejecutó la transacción correctamente!");

						   



						    let data = {
						    "status": "approved",
						    "carrier": "okcredit"
						  }

						  	return resolve(data)

						




						}).catch(function(error) {
						    console.log("Hubo un error: ", error);
						});

						

						


					}




			   })

		    
		  
		    
		    
		  })
		}












		//Ejecución de las funciones/promesas
		processPayment()
		.then(param => {
			      	if (param.err == "insufficient credit" ) {
					

						console.log(param)//{err: "insufficient credit"}
						

						response = param
					

					}
					else
					{
						
						setCredit(param)
						.then(data => {
					      
							
							//Se envía a oknube_suscriptions
							console.log(procesOrder(data))

							
							response = {err: null, status: "approved", amount: "order.amount"}





							

					   })

					}


					// res.send(response)

			   })


