
const express = require('express');
var axios = require('axios');

const app = express();

app.use(express.urlencoded({extended: true}))
  

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "application/xml; charset=utf-8")
  next();
  
});

function escapeXMLEntities(xmldata) {

    return xmldata.replace(/[\u00A0-\u2666<>\&]/g, function (a) {

            return "&#" + a.charCodeAt(0) + ";"

    })

};


app.post('/ServicoConsultaMedicos', (req, res) => {
    var data = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.cfm.org.br/">\r\n<soapenv:Header/>\r\n<soapenv:Body>\r\n<ser:Consultar>\r\n<crm>${req.body.crm}</crm>\r\n<uf>${req.body.uf}</uf>\r\n<chave>63W9932G</chave>\r\n</ser:Consultar>\r\n</soapenv:Body>\r\n</soapenv:Envelope>
    
    `
    
    var config = {
      method: 'post',
      url: 'https://ws.cfm.org.br:8080/WebServiceConsultaMedicos/ServicoConsultaMedicos',
      headers: { 
        'Content-Type': ('application/xml', 'charset=UTF-8')
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      res.send(response.data)
      
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log(req.body.crm);
    console.log(req.body.uf);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));