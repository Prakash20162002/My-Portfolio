const express = require("express")
const path = require("path")
const app = express()
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);
app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))
app.use(cors());

app.get("/",(req,res)=>
    {
        res.setHeader("Access-control-allow-credentials","true");
        res.send("Api Is running.......");
    })

app.use(cors());

app.get("/", (req, res) => {

    res.setHeader("Access-control-allow-credentials", "true");
    res.send("Api Is running.......");
});


app.get('/contact', (req, res) => {
    res.render('contactus')
})


app.post('/contact', async (req, res) => {

    try {

        const { email } = req.body;

        const validateUser = await LogInCollection.findOne({ email: email })

        if (validateUser) {
            return res.status(400).json({ error: "Alredy Sended" })
        }

        const data = await LogInCollection(req.body)

        await data.save()

        res.status(200).redirect('/')


    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

app.listen(process.env.PORT || port, () => {
    console.log('port connected');
})
