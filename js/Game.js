class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      
      form = new Form()
      form.display();
      console.log(form);
    }
  }

  play(){
    console.log("Hello");
    form.hide();
    textSize(30);
    text("Game Start", 120,100);
    Player.getPlayerInfo();
    if(allPlayers != undefined){
      console.log("World");
      var playerPosition = 130;
      for(var i in allPlayers){
        console.log(i);
        if(i === "player"+player.index){
          fill("red");
        }

        else{
          fill("black");
        }

        playerPosition += 20;
        textSize(15);
        text(allPlayers[i].name+" : "+allPlayers[i].distance, 120, playerPosition);
      }
    }

    if(keyIsDown(UP_ARROW) && player.index != null){
      player.distance+=50;
      player.update();
    }
  }
}
