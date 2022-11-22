const db = require('./db'); 
const admin = require('firebase-admin')

async function getCities(){
   try {
        let response = [];
        await db.collection('cities').get()
        .then(snapshot => {
            snapshot.forEach((city) => {response.push(city.data());
            });
            console.log(response);
            });
}
catch (error) {
            return res.status(500).send(error);
        }
    }

  /*       app.get('/api/read/items', (req, res) => {
            (async () => {
                try {
                    let snapshot = await snapshot db.collection('items').get();
                    let response = snapshot.documents.map((item) => item.data());
                    return res.send(response);
                } catch (error) {
                    return res.status(500).send(error);
                }
            })();
            });

            app.get('/api/read/:item_id', (req, res) => {
                (async () => {
                    try {
                        const document = db.collection('items').doc(req.params.item_id);
                        let item = await document.get();
                        let response = item.data();
                        return res.status(200).send(response);
                    } catch (error) {
                        console.log(error);
                        return res.status(500).send(error);
                    }
                })();
            });
 */

            module.exports = { getCities }