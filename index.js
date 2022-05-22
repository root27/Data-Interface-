const express = require('express');
const app = express();
const db = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const {PDFDocument} = require('pdf-lib');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrpt = require('bcrypt');




require('dotenv').config();


const {power, endurance, injury, oxygen, motor} = require("./genedata")

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { path } = require("express/lib/application");



const admin = db.createPool({
    host : "localhost",
    user : process.env.AUTH_USER,
    password : process.env.AUTH_PASS,
    database : "admins"
});



const connection = db.createPool({
    host: 'localhost',
    user: process.env.DATA_USER,
    password: process.env.DATA_PASS,
    database:'data'
  });




if (connection) {
    console.log('Connected!');
}


app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors( {origin: 'http://localhost:3000'}));


const jwtkey = process.env.JWT_SECRET;
const jwtExpirySeconds = 1000;

//Register new user
app.post("/auth/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedpassword = await bcrpt.hash(password, 10);

    
    try {
        const result = admin.query(
            `INSERT INTO users (username,  password) VALUES (?, ?)`,
            [username,  hashedpassword]
        );
        res.status(200).send("User registered");
    } catch (err) {
        res.status(400).send(err.message);
    }
})


app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = ?`;
    
        admin.query(query, [username], async(err, results) => {
            
            if (results[0]) {
                const isValid = await bcrpt.compare(password, results[0].password);
                if (isValid) {
                    const token = jwt.sign({
                        username
                    }, jwtkey, {
                        expiresIn: jwtExpirySeconds
                    });
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: jwtExpirySeconds * 1000,
                        
                        secure:  req.headers['x-forwarded-proto'] === 'https', // only send cookies over https

                    });
                    
                    res.status(200).json({
                        token,
                        data : {
                            username
                        }
                    });
                    
                } else {
                    res.status(400).send("Invalid username or password");
                }
            } else {
                res.status(400).send("Invalid username or password");
            }
        }
        );
       
    
})

app.get("/user", async (req, res) => {
    let currentUser = null;
    const token = req.cookies.jwt;
    if (token) {
        try {
            const { username } = jwt.verify(token, jwtkey);
            currentUser = username;
            res.status(200).send({currentUser});
        } catch (err) {
            res.status(400).send("Invalid token");
        }
    } else {
        res.status(400).send("No token");
        currentUser = null;
    }
    
})


app.get("/get-user-data", (req, res) => {

    const query = "SELECT table_name FROM information_schema.tables WHERE table_schema ='data';";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });



})

app.get("/get/:team/:id", (req, res) => {
    const team = req.params.team;
    const id = req.params.id;
    const query = 'SELECT * FROM ?? WHERE id = ?';
    console.log(team);
    connection.query(query, [team,id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
})

app.post("/update/:team/:id", (req, res) => {
    const genes = req.body.genes;
    const status = req.body.Status;
    const team = req.params.team;
    const id = req.params.id;
    const query = "UPDATE ?? SET Status = '" +status+ "',genes = '" +JSON.stringify(genes)+ "'  WHERE id = ?";
    connection.query(query, [team, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
})

app.get("/get-personal/:id",(req,res)=>{

    connection.query('SELECT * FROM personal WHERE id = ? ',[req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });


})


app.post("/update-personal/:id",(req,res)=>{
    const genes = req.body.genes;
    const status = req.body.Status;
    const country = req.body.country;
   
    

    connection.query("UPDATE personal SET Status = '" +status+ "' ,genes = '" +JSON.stringify(genes)+ "',country='" +country+ "'  WHERE id = ? ", [req.params.id] ,(err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
})

app.get("/team/:teamname", (req, res) => {
    
        connection.query('SELECT * FROM ??', [req.params.teamname], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
})


app.get("/personal", (req,res) => {
    connection.query('SELECT * FROM personal', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
})
    
    

app.post("/add-team", (req,res) => {
    
        const name = req.body.name;
        const genes = req.body.genes;
        const status = req.body.Status;
        const id = req.body.id;
        
        const country = req.body.country;
        
        
        const query = "INSERT INTO ?? (status, genes, id, country) VALUES ('" +status+ "' ,'" + JSON.stringify(genes) + "', '" +id+ "', '" +country+ "') ;"
        connection.query(query, [name], (err, rows, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send('Success');
            }
        });   
        
    
    
})


app.post("/add-teamname", (req,res) => {
    const name = req.body.name;

    const query = "CREATE TABLE IF NOT EXISTS `" +name+ "` (id INT NOT NULL AUTO_INCREMENT, genes JSON NULL, physical JSON NULL, sport_type VARCHAR(255) NULL, Status VARCHAR(255) NULL, PRIMARY KEY (id))";
    connection.query(query, (err, rows, fields) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send('Success');
        }
    });
})



app.post("/add-personal", (req,res) => {
        
            
            const genes = req.body.genes;
            const status = req.body.Status;
            const id = req.body.id;
            const country = req.body.country;
            
            
            const query = "INSERT INTO personal (Status,genes,id,country) VALUES ('" +status+ "','" + JSON.stringify(genes) + "','" +id+ "','" +country+ "' ) ;"
            connection.query(query, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send('Success');
                }
            });   
            
        
        
})

app.delete("/delete-personal/:id", (req,res) => {
    connection.query("DELETE FROM personal WHERE id = ? ", [req.params.id] ,(err, rows, fields) => {
        path = "./reports/personal_" + req.params.id + ".pdf";

        if (!err && path) {
            res.send(rows);
            fs.unlinkSync(path);
        } else {
            console.log(err);
        }
    });
})

app.delete("/delete/:team/:id", (req,res) => {

    connection.query("DELETE FROM ?? WHERE id = ? ", [req.params.team, req.params.id] ,(err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
})




app.get("/pdf-personal/:id", (req,res) => {


    var file = fs.createReadStream('./reports/personal_'+req.params.id+'.pdf');
    file.pipe(res);

          
});

app.get("/create-personal-report/:id", (req,res) => {
    

    connection.query("SELECT * FROM personal WHERE id = ?", [req.params.id], (err, rows, fields) => {
        rows.forEach(row => {
            const genes = row.genes;
            const data_pages = [];
            const filtered = [];
            
            var p = 0;
            var e = 0;
            var o = 0;
            var m = 0;
            var i = 0;


            fs.readdir("./pdf", (err,files) => {
                if (err) {
                    console.log(err);
                }
                else {
                    files.sort()
                    
                   


                    for (const [key, value] of Object.entries(genes)) {
                        
                        power.forEach((item) =>{
                            if ( Object.keys(item).includes(key) ){
                                Object.values(item).forEach((item2) => {
                                    if(Object.keys(item2).includes(value)){
                                        p = p + item2[value];
                                    }
                                })
                            }
                        })

                        endurance.forEach((item) =>{
                            if ( Object.keys(item).includes(key) ){
                                Object.values(item).forEach((item2) => {
                                    if(Object.keys(item2).includes(value)){
                                        e = e + item2[value];
                                    }
                                })
                            }
                        })

                        injury.forEach((item) =>{
                            if ( Object.keys(item).includes(key) ){
                                Object.values(item).forEach((item2) => {
                                    if(Object.keys(item2).includes(value)){
                                        i = i + item2[value];
                                    }
                                })
                            }
                        })

                        oxygen.forEach((item) =>{
                            if ( Object.keys(item).includes(key) ){
                                Object.values(item).forEach((item2) => {
                                    if(Object.keys(item2).includes(value)){
                                        o = o + item2[value];
                                    }
                                })
                            }
                        })

                        motor.forEach((item) =>{
                            if ( Object.keys(item).includes(key) ){
                                Object.values(item).forEach((item2) => {
                                    if(Object.keys(item2).includes(value)){
                                        m = m + item2[value];
                                    }
                                })
                            }
                        })

                        files.filter(file => {
                                if (file.split("_")[1] === key && file.split("_")[2] === value.toLowerCase() + ".pdf") {
                                    return data_pages.push(file);
                                }
                            });
           
                    }
                    

                    console.log(p,e,o,m,i);

                    const data = {
                        labels: [
                          'Güç Eğilimi',
                          'Dayanıklılık Eğilimi',
                          'Sakatlanma Riski',
                          'Oksijen Kapasitesi',
                            'Motor Becerisi'
                        ],
                        datasets: [{
                          label : "Sonucunuz",
                          data: [p*100/12, e*100/12, i*100/8, o*100/4, m*100/4],
                          fill: true,
                          backgroundColor: 'rgba(54, 162, 235, 0.2)',
                          borderColor: 'rgb(54, 162, 235)',
                          pointBackgroundColor: 'rgb(54, 162, 235)',
                          pointBorderColor: '#fff',
                          pointHoverBackgroundColor: '#fff',
                          pointHoverBorderColor: 'rgb(54, 162, 235)'
                        }]
                      };

                      const config = {
                        type: 'radar',
                        data: data,
                        options: {
                          elements: {
                            line: {
                              borderWidth: 3
                            }
                          },
                          scales: {
                              r: {
                                suggestedMin: 0,
                                suggestedMax: 100,
                                //startAngle: 72,
                                pointLabels: {
                                    font: {
                                        size: 13
                                    }
                                },
                                ticks: {
                                    
                                    stepSize: 20
                                }
                            }
                          
                            
                              
                            },

                            plugins: {
                                legend : {
                                    display: false
                                }
                            }
                            
                        },
                      };

                      const width = 500; //px
                      const height = 500; //px
                      const backgroundColour = 'white'; 
                      const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});

                        async function createradar () {
                            const image = await chartJSNodeCanvas.renderToBuffer(config);
                            fs.writeFileSync("reports/test.png", image, 'base64', (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        }
                        
                        

                         createradar().then(() => readeditpdf("./pdf/04_tendency_page.pdf")) 
                         edittgs("./pdf/05_tgs_page.pdf", p,e,o,m,i);
                         
                        
                      
                         
                         
                        

                files.filter(file => {
                    if (file.includes("info")) {
                        return filtered.push(file);
                    }
                });

                const result = data_pages.concat(filtered);
                
                result.sort()
                
                generatePdf(result).then(() => {
                    res.send('Success');
                }
                ).catch(err => {
                    console.log(err);
                });


                }
               
            });      
        });
    });


        async function edittgs (path,p,e,o,m,i) {
            const page = await PDFDocument.load(fs.readFileSync(path));
            const doc = await PDFDocument.create();
            const [content] = await doc.copyPages(page,[0]);
            const main = doc.addPage(content);

            const img = fs.readFileSync("./icons/newikon.png");
            const image = await doc.embedPng(img);
            
            const { width, height } = image.scale(0.02);
            console.log(main.getSize());
            // bar max 300
            //bar min 40
            // power bar height- 187
            //injury bar height 244.5
            //oxygen bar height 300.5
            // motor bar height 357.5
            // endurance bar height 414.5


            console.log(p*100/12, e*100/12, i*100/8, o*100/4, m*100/4);
            // endurance
            main.drawImage(image, {
                x: 40 + ((e*100/12)*260/100),
                y: main.getHeight() - 410.5,
                width: width,
                height: height,
                opacity: 0.9
            });

            //motor
            main.drawImage(image, {
                x: 40 + ((m*100/4)*260/100),
                y: main.getHeight() - 354.5,
                width: width,
                height: height,
                opacity: 0.9
            });

            //oxygen
            main.drawImage(image, {
                x: 40 + ((o*100/4)*260/100),
                y: main.getHeight() - 297.5,
                width: width,
                height: height,
                opacity: 0.9
            });

            //injury
            main.drawImage(image, {
                x: 40 + ((i*100/8)*260/100),
                y: main.getHeight() - 241.5,
                width: width,
                height: height,
                opacity: 0.9
            });

            //power
            main.drawImage(image, {
                x: 40 + ((p*100/12)*260/100),
                y: main.getHeight() - 184.5,
                width: width,
                height: height,
                opacity: 0.9
            });



            const pdfbytes = await doc.save();
            fs.writeFileSync("./dummy_pdf/05.pdf", pdfbytes);
        }

 
         async function readeditpdf (path) {
             const page = await PDFDocument.load(fs.readFileSync(path));
                const doc = await PDFDocument.create();
                const [content] = await doc.copyPages(page, [0]);
                const main = doc.addPage(content);

             const img = fs.readFileSync("./reports/test.png");
             
            const image = await doc.embedPng(img);
            // const { width, height } = image.scaleToFit(130, 130);
            const { width, height } = image.scale(1);
                main.drawImage(image,{
                    // x : main.getWidth()/5 - width/2,
                     // y: main.getHeight()/3 - height/2,
                        x : main.getWidth()/2 - width/2,
                        y: main.getHeight()/2 - height/2,
                        width: width,
                        height: height,
                       
                    } );
                
             
             
                const pdfBytes = await doc.save();
                
            fs.writeFileSync("./dummy_pdf/04.pdf", pdfBytes);
                               
             
         }




            async function generatePdf  (pages){
                const doc = await PDFDocument.create();
        
                for (const page of pages) {
                    
                    const sayfa = await PDFDocument.load(fs.readFileSync('./pdf/'+page));
                    const [content] = await doc.copyPages(sayfa, [0]);
        
                    doc.addPage(content);
                
                
                };

                const sayfa2 = await PDFDocument.load(fs.readFileSync('./dummy_pdf/04.pdf'));
                const [content2] = await doc.copyPages(sayfa2, [0]);
                doc.insertPage(3, content2);

                const sayfa3 = await PDFDocument.load(fs.readFileSync("./dummy_pdf/05.pdf"));
                const [content3] = await doc.copyPages(sayfa3, [0]);
                doc.insertPage(4, content3);

               
                fs.writeFileSync('./reports/personal_'+req.params.id+'.pdf', await doc.save());
                
            };


});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
  }
);


