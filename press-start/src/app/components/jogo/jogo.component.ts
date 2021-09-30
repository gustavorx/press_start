import { Component, OnInit } from '@angular/core';
const { MongoClient } = require('mongodb')


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  // Id: number;

  constructor() { }

  ngOnInit(): void {
  }

  consultarJogo() {
    // const uri = "mongodb+srv://pressstart:pressstart@cluster0.tae7v.mongodb.net/PressStart?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // client.connect(err => {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // });
  }

}
