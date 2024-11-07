var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
// ----------------------- Variáveis  -------------///
var serv = "https://murphy-bros.000webhostapp.com";
var jogador;	
var controles;
var plataformas;
var moedas;
var moedas_aux;
var decoracao;
var decoracao2;
var PegouChave = false;
var pontos = 0;
var pontosComeco =0;
var pontosTexto;
var nivel = "01";
var tempo = 0;
var time;
var recorde ;
var sfx;
var bgm;
var enemyWalls;
var fpsText;
var musicaLose;
var velot = [];
var keyIcon;
var fimdejogo;
var nome;

var perguntas =[];

var pos= 32;
var  proximoN = true;
var  comecar = true;
var fim = false;
      

      // function

                  function  escreve(valor,nome) {
                      var aux = valor+":"+nome;
                      $.ajax({
                         	crossDomain: true,
                          url: serv+"/api/escreve",
                          data: aux,
                           headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                          type: "POST",
                          //contentType: "application/json",
						  dataType: "json" ,
						  success: function (result) {
               
                      }
                         });
                  }


                     function ler() {
                      
                      $.ajax({
                          crossDomain: true,
                          url: serv+"/api/ler",
                          type: "GET",
                          success: function (result) {
                             recorde = parseInt(result.pontos);
                             nome = result.nome;
                          }
                      });
                  }



ler();


// ----------------------- Função Preload  -------------///
function preload()
{
		
         
        
        	game.load.image('background', 'asset/background.png');
            game.load.image('grass01', 'asset/grass_1x1.png');		
			game.load.image('grass04', 'asset/grass_4x1.png');
            game.load.image('chave', 'asset/key.png');
            game.load.image('invisible-wall', 'asset/invisible_wall.png');
              game.load.image('imagem_pontos', 'asset/IMAGEM_pontos.png');
                    game.load.image('Play', 'asset/Play.png');
                      game.load.image('GAME_OVER', 'asset/GAME_OVER.png');
                      game.load.image('GAME_START', 'asset/GAME_START.png');
                        game.load.image('Restart', 'asset/Restart.png');
                            game.load.image('NEW', 'asset/NEW.png');
                            game.load.image('TIME', 'asset/TIME.png');                            
			    game.load.json('level01', 'asset/level01.json');
                game.load.json('level02', 'asset/level02.json');

                    game.load.spritesheet('dude', 'asset/dude.png', 32, 48);
                    game.load.spritesheet('moeda', 'asset/moeda.png', 22, 22);
                     game.load.spritesheet('moeda2', 'asset/moeda2.png', 22, 22);
                    game.load.spritesheet('monstro', 'asset/spider.png',32,32);	
                    game.load.spritesheet('monstro2', 'asset/spider2.png',32,32)		
                    game.load.spritesheet('porta', 'asset/door.png', 42, 66);
                       game.load.spritesheet('icon', 'asset/key_icon.png', 34, 30);
                  //   game.load.spritesheet('monstro', 'asset/spider.png',32, 32);
                  game.load.spritesheet('decor', 'asset/decor.png', 42, 42);

                    this.game.load.audio('sfx:jump', 'asset/audio/jump.mp3');
                    this.game.load.audio('sfx:coin', 'asset/audio/coin.wav');
                    this.game.load.audio('sfx:key', 'asset/audio/key.wav');
                    this.game.load.audio('sfx:stomp', 'asset/audio/stomp.wav');
                    this.game.load.audio('sfx:door', 'asset/audio/door.wav');
                    this.game.load.audio('sfx:comp', 'asset/audio/comp.mp3');
                    this.game.load.audio('bgm', ['asset/audio/bgm.mp3', 'asset/audio/bgm.ogg']);
                     // this.game.load.audio('sfx:bgm', 'asset/audio/bgm.mp3');
                  
                     
}



// ----------------------- Função Create  -------------///
function create() 
{ 	
    
 
            

perguntas["moedas"] = 0;

perguntas["moeda"] = 0;
perguntas["moeda2"] = 0;
perguntas["qtd-moeda"]= 0;
perguntas["qtd-moeda2"]= 0;

perguntas["monstros"] = 0;

perguntas["monstro"] = 0;
perguntas["qtd-monstro"]= 0;
perguntas["qtd-monstro2"]= 0;

perguntas["obj-0"]= 0; // cristal
perguntas["obj-1"]= 0; // Abusto azul
perguntas["obj-2"]= 0; // cerca
perguntas["obj-3"]= 0; // cogumelo
perguntas["obj-4"]= 0; // Planta Verde



perguntas["flores"] = 0;

perguntas["flores-ver"]= 0;
perguntas["flores-roxa"]= 0;


    fimdejogo=false;

this.camera.flash(0x000000, 900, false);
 game.add.tileSprite(0, 0, 1780, 600, 'background');
  
  //game.world.setBounds(0, 0, 1780, 600);
   game.world.resize(1780, 600);
    game.physics.startSystem(Phaser.Physics.P2JS);


  sfx = {
                   jump: this.game.add.audio('sfx:jump'),
                   coin: this.game.add.audio('sfx:coin'),
                      key: this.game.add.audio('sfx:key'),
                         stomp: this.game.add.audio('sfx:stomp'),
                            door: this.game.add.audio('sfx:door'),
                             comp: this.game.add.audio('sfx:comp')
                               
                 };

bgm = game.add.audio('bgm');
   bgm.loopFull();

  
enemyWalls = this.game.add.group();
 enemyWalls.enableBody = true;	
enemyWalls.visible = false;
  
    
      		plataformas = game.add.group();
            moedas = game.add.group();
            decoracao = this.game.add.group();
            decoracao2 = game.add.group();               
            plataformas.enableBody = true;		

		            loadLevel(this.game.cache.getJSON('level'+nivel));



			jogador = game.add.sprite(pos, game.world.height - 150, 'dude');
            game.physics.arcade.enable(jogador);
            jogador.body.bounce.y = 0.3;
            jogador.body.gravity.y = 1350;
            jogador.body.collideWorldBounds = true;
            jogador.animations.add('left', [0, 1, 2, 3], 10, true);
            jogador.animations.add('right', [5, 6, 7, 8], 10, true);
            
    game.physics.p2.enable(jogador);
    controles = game.input.keyboard.createCursorKeys();
    game.camera.follow(jogador, Phaser.Camera.FOLLOW_LOCKON);
 
            
			//    controles = game.input.keyboard.createCursorKeys();
                pontosTexto = game.add.text(70, 16, 'Pontos: '+pontos, { fontSize: '32px', fill: '#000' });
				time = game.add.text(770, 16, 'Tempo: ' +parseInt(tempo), { fontSize: '32px', fill: '#f02' });

    game.time.advancedTiming = true;
    fpsText = game.add.text(game.camera.width-60, 60, 'fps...', { font: '16px Arial', fill: '#f00' } );
 

                keyIcon =  game.add.sprite(16,16, 'icon');
            //  game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);      
                
                keyIcon.fixedToCamera = true;    
                time.fixedToCamera = true;
                pontosTexto.fixedToCamera = true;
                fpsText.fixedToCamera = true;                   
if(!proximoN)
{
    fimDoJogo();
}

        if(comecar)
        {
            comecar = false;
            ComecarGame();
        }

        if(fim)
        {
            TerminarGame();
        }


}


function ComecarGame(){

    comecar = false;

    fimdejogo=true;
   jogador.body.x = 0;
    jogador.kill();    
    var posicaoJogadorX = jogador.body.x;
    
	
 
   // var f =  game.add.sprite(posicaoJogadorX - 120<10 ?posicaoJogadorX+10 : posicaoJogadorX - 120, game.world.centerY-120, 'imagem_pontos');
      var gameStart =  game.add.sprite((960/2)+10, game.world.centerY-90, 'GAME_START');
     gameStart.scale.setTo(3,3);
      gameStart.x = gameStart.x - gameStart.width/2+ 10;

    var play =  game.add.sprite((960/2), game.world.centerY+20, 'Play');
    play.scale.setTo(0.9,0.9);
    play.x = play.x - play.width/2+ 10;

  

        
 //game.paused = true;
play.inputEnabled = true;
        play.input.useHandCursor = true;


proximoN = true;

     play.events.onInputUp.add(function () {
        bgm.stop(); 
         tempo = 0;	
     PegouChave = false;
	pontos = 0;
  this.game.state.restart(true, false, {});

      });


}




function TerminarGame(){
    ler();
     alert("Obrigado por participar!!");
     
window.location.replace("https://docs.google.com/forms/d/e/1FAIpQLSe0ibmi13qxMPM3GwrpYJFwJ746yRGVWta93aNz9QIsNLskag/viewform");
     bgm.stop();

    fimdejogo=true;
    jogador.body.x = 0;
    jogador.kill();    
    var posicaoJogadorX = jogador.body.x;
	
        var gameStart =  game.add.sprite((960/2), game.world.centerY-190, 'GAME_START');
     gameStart.scale.setTo(3,3);
      gameStart.x = gameStart.x - gameStart.width/2+ 10;
     var f =  game.add.sprite((960/2) ,game.world.centerY-100, 'imagem_pontos');
     f.x = f.x - f.width/2;
     var Restart =  game.add.sprite((960/2)-f.width/6 - 8, game.world.centerY+f.y-90, 'Restart');
  
     var placarTempo =  game.add.text((960/2)-24 , game.world.centerY-40, parseInt(tempo), { fontSize: '22px', fill: '#fff' });
     if(recorde == tempo)
     var imgRecorde =  game.add.sprite((960/2)-110, game.world.centerY+15, 'NEW');
      var placarRecorde =  game.add.text((960/2)-54, game.world.centerY+45,nome +": "+ parseInt(recorde), { fontSize: '22px', fill: '#fff' });
    placarRecorde.x = placarRecorde.x - placarRecorde.height/2 + 4;




 
    

       
        //game.paused = true;
Restart.inputEnabled = true;
        Restart.input.useHandCursor = true;


        proximoN = true;

   Restart.events.onInputUp.add(function () {
        pontosComeco = 0;
        fim = 0;
        tempo= 0;
        nivel = "01";
        pontos = 0;
        PegouChave = false;
        this.game.state.restart(true, false, {});


      });

}




function fimDoJogo(){

 ler();

    var fimdejogo=true;
    jogador.body.x = 0;
    jogador.kill();    
    var posicaoJogadorX = jogador.body.x;
	
 
game.camera.x = 0;
game.camera.y =0;
	
    var gameStart =  game.add.sprite((960/2), game.world.centerY-190, 'GAME_OVER'); 
      gameStart.scale.setTo(1.5,1.5);    
      gameStart.x = gameStart.x - gameStart.width/2+ 10;
    
     var f =  game.add.sprite((960/2) ,game.world.centerY-100, 'imagem_pontos');
     f.x = f.x - f.width/2;
    
     var play =  game.add.sprite((960/2)-f.width/3 - 18, game.world.centerY+f.y-90, 'Play');
    var Restart =  game.add.sprite((960/2)+f.width/6 -55, game.world.centerY+f.y-90, 'Restart');
  
     var placarTempo =  game.add.text((960/2)-24 , game.world.centerY-40, parseInt(tempo), { fontSize: '22px', fill: '#fff' });
     if(recorde == tempo)
     var imgRecorde =  game.add.sprite((960/2)-110, game.world.centerY+15, 'NEW');


     
     var placarRecorde =  game.add.text((960/2)-54, game.world.centerY+45,nome +": "+ parseInt(recorde), { fontSize: '22px', fill: '#fff' });
    placarRecorde.x = placarRecorde.x - placarRecorde.height/2 + 4;

     var iconTime = game.add.sprite(placarRecorde.x -25, game.world.centerY+48, 'TIME');
      iconTime.scale.setTo(0.04,0.04);   
   
 
 //game.paused = true;
play.inputEnabled = true;
        play.input.useHandCursor = true;


Restart.inputEnabled = true;
        Restart.input.useHandCursor = true;

proximoN = true;

     play.events.onInputUp.add(function () {
         bgm.stop();
         
         tempo = tempo + 14;	
     PegouChave = false;
	pontos = pontosComeco;
  this.game.state.restart(true, false, {});

      });


     Restart.events.onInputUp.add(function () {
         bgm.stop();

        pontosComeco = 0;
        tempo= 0;
        nivel = "01";
        pontos = 0;
          PegouChave = false;
        this.game.state.restart(true, false, {});


      });

	
 


}

// ----------------------- Função Update  -------------///
function update() {  

  if(game.time.fps !== 0){
      fpsText.text = game.time.fps + ' FPS';

    }
     keyIcon.frame = PegouChave ? 1 : 0;

 var hitPlatform = game.physics.arcade.collide(jogador, plataformas);
            if(!fimdejogo)
            {
                tempo = tempo + Phaser.Timer.SECOND * 1.9/100000;
                time.text = "Tempo: " + parseInt(tempo);	
            }

game.physics.arcade.overlap(jogador, moedas, pegarMoeda, null, this);
game.physics.arcade.collide(moedas, plataformas);	
game.physics.arcade.collide(spiders, plataformas);
game.physics.arcade.collide(chave, plataformas);
game.physics.arcade.collide(porta, plataformas);
game.physics.arcade.collide(spiders, enemyWalls);

    game.physics.arcade.overlap(jogador, chave, jogadorVSchave, null, this);
    game.physics.arcade.overlap(jogador, spiders, jogadorVSmonstro, null, this);			
    game.physics.arcade.overlap(jogador, porta, jogadorVSporta, null, this);
           // return this.hasKey && player.body.touching.down;

            jogador.body.velocity.x = 0;
            if (controles.left.isDown)
            {
               if(controles.left.shiftKey)
                {
                jogador.body.velocity.x = -300;
                jogador.animations.play('left');
                }else{
                 jogador.body.velocity.x = -150;
                jogador.animations.play('left');
                }
            }
            else if (controles.right.isDown)
            {

               
                if(controles.right.shiftKey)
                {
                jogador.body.velocity.x = 300;
                jogador.animations.play('right');
                }else{
                 jogador.body.velocity.x = 150;
                jogador.animations.play('right');
                }
            }
            else
            {
                jogador.animations.stop();
                jogador.frame = 4;
                
            }
            
            if (controles.up.isDown && jogador.body.touching.down && hitPlatform)
            {	
                jogador.body.velocity.y = -550;	
                 sfx.jump.play();			  
            }   

           
             

          
			/*
			if(this.chave == true)
			{
				this.chave = false;
				   //console.log(door.frame =1);
			}	*/			

        }



// ----------------------- Função jogadorVSporta  -------------///	
function jogadorVSporta  (jogador, porta) {		
	
		if(jogador.body.touching.down && PegouChave == true)
		{
            //*Animação do jogador
			porta.frame=1;
            sfx.door.play();
            sfx.comp.play();	
			this.game.add.tween(jogador).to({x: porta.x, alpha: 0}, 500, null, true).onComplete.addOnce(proximoNivel, this);				
			PegouChave = false;	
			//this.door.frame=0;
			//create();			
		}   
}


// ----------------------- Função proximoNivel  -------------///
function proximoNivel() {
  
    bgm.stop();   
  this.camera.fade('#000000');
  //jogador.kill();
    //var posicaoJogadorX = jogador.body.x;
    //console.log(perguntas);
    var perg;
   // var sorteio=Math.floor(Math.random() * 5);
    var quantCertas=0;
    var sorteados = [];


 

    for(var x=0; x<5; x++)
    {   
    var sorteio = Math.floor(Math.random() * 17);
    while (sorteados.indexOf(sorteio) >= 0) 
    {
      sorteio = Math.floor(Math.random() * 17);
    }
        sorteados.push(sorteio);

  /// perguntas sobre as moedas 0 - 4 
        if(sorteio == 0)
        {
            perg = prompt("Quantas moedas prateadas você coletou?") == perguntas["moeda2"];
                if(perg)
                {
                    alert("Muito bem, você acertou!!, foram: "+perguntas["moeda2"]+" moeda(s).");
                    quantCertas++;
                }else
                {
                    alert("Que pena, você errou!!, foram: "+perguntas["moeda2"]+" moeda(s).");
                    tempo = tempo +5;
                }
        }else{
            if(sorteio == 1)
            {
                perg = prompt("Quantas moedas douradas você coletou?") == perguntas["moeda"];
                    if(perg)
                    {
                        alert("Muito bem, você acertou!!, foram: "+perguntas["moeda"]+" moeda(s).");
                        quantCertas++;
                    }else
                    {
                        alert("Que pena, você errou!!, foram: "+perguntas["moeda"]+" moeda(s).");
                        tempo = tempo +5;
                    }
            }else{
                if(sorteio == 2)
                {
                perg = prompt("Quantas moedas prateadas você não coletou?") == (perguntas["qtd-moeda2"]-perguntas["moeda2"]);
                    if(perg)
                    {
                        alert("Muito bem, você acertou!!, foram: "+(perguntas["qtd-moeda2"]-perguntas["moeda2"])+" moeda(s).");
                        quantCertas++;
                    }else
                    {
                        alert("Que pena, você errou!!, foram: "+(perguntas["qtd-moeda2"]-perguntas["moeda2"])+" moeda(s).");
                        tempo = tempo +5;
                    }
                }else
                {
                    if(sorteio == 3)
                    {
                    perg = prompt("Quantas moedas douradas você não coletou?") == (perguntas["qtd-moeda"]-perguntas["moeda"]);
                        if(perg)
                        {
                            alert("Muito bem, você acertou!!, foram: "+(perguntas["qtd-moeda"]-perguntas["moeda"])+" moeda(s).");
                            quantCertas++;
                        }else
                        {
                            alert("Que pena, você errou!!, foram: "+(perguntas["qtd-moeda"]-perguntas["moeda"])+" moeda(s).");
                            tempo = tempo +5;
                        }
                    }else
                    {
                        if(sorteio == 4)
                        {
                        perg = prompt("Qual total de moedas que você coletou?") == (perguntas["moeda"]+perguntas["moeda2"]);
                            if(perg)
                            {
                                alert("Muito bem, você acertou!!, foram: "+(perguntas["moeda"]+perguntas["moeda2"])+" moeda(s).");
                                quantCertas++;
                            }else
                            {
                                alert("Que pena, você errou!!, foram: "+(perguntas["moeda"]+perguntas["moeda2"])+" moeda(s).");
                                tempo = tempo +5;
                            }
                        }else
                        {
                            /// perguntas sobre os monstros 5 - 10
                            if(sorteio == 5)
                            {
                            perg = prompt("Quantos monstros você derrotou ?") == (perguntas["monstro"]);
                                if(perg)
                                {
                                    alert("Muito bem, você acertou!!, foram: "+(perguntas["monstro"])+" monstro(s).");
                                    quantCertas++;
                                }else
                                {
                                    alert("Que pena, você errou!!, foram: "+(perguntas["monstro"])+" monstro(s).");
                                    tempo = tempo +5;
                                }
                            }else
                            {
                                if(sorteio == 6)
                                {
                                perg = prompt("Quantos monstros você não derrotou ?") == (perguntas["qtd-monstro2"]+
                                (perguntas["qtd-monstro"]-perguntas["monstro"]));
                                    if(perg)
                                    {
                                        alert("Muito bem, você acertou!!, foram: "+(perguntas["qtd-monstro2"]+
                                (perguntas["qtd-monstro"]-perguntas["monstro"]))+" monstro(s).");
                                        quantCertas++;
                                    }else
                                    {
                                        alert("Que pena, você errou!!, foram: "+(perguntas["qtd-monstro2"]+
                                (perguntas["qtd-monstro"]-perguntas["monstro"]))+" monstro(s).");
                                tempo = tempo +5;
                                    }
                                }else
                                {
                                    if(sorteio == 7)
                                    {
                                    perg = prompt("Quantos monstros existiam nessa fase?") == (perguntas["monstros"]);
                                        if(perg)
                                        {
                                            alert("Muito bem, você acertou!!, foram: "+(perguntas["monstros"])+" monstro(s).");
                                            quantCertas++;
                                        }else
                                        {
                                            alert("Que pena, você errou!!, foram: "+(perguntas["monstros"])+" monstro(s).");
                                            tempo = tempo +5;
                                        }
                                    }else
                                    {
                                        if(sorteio == 8)
                                        {
                                        perg = prompt("Quantos monstros da cor azul existiam?") == (perguntas["qtd-monstro2"]);
                                            if(perg)
                                            {
                                                alert("Muito bem, você acertou!!, existiam: "+(perguntas["qtd-monstro2"])+" monstro(s).");
                                                quantCertas++;
                                            }else
                                            {
                                                alert("Que pena, você errou!!, existiam: "+(perguntas["qtd-monstro2"])+" monstro(s).");
                                                tempo = tempo +5;
                                            }
                                        }else
                                        {
if(sorteio == 9)
{
    perg = prompt("Quantos monstros da cor lilas existiam?") == (perguntas["qtd-monstro"]);
        if(perg)
        {
            alert("Muito bem, você acertou!!, existiam: "+(perguntas["qtd-monstro"])+" monstro(s).")
            quantCertas++;
        }else
        {
            alert("Que pena, você errou!!, existiam: "+(perguntas["qtd-monstro"])+" monstro(s).");
            tempo = tempo +5;
        }
}else{  
    if(sorteio == 11)
    {
        perg = prompt("Quantos monstros da cor lilas você derrotou?") == (perguntas["monstro"]);
            if(perg)
            {
                alert("Muito bem, você acertou!!, foram: "+(perguntas["monstro"])+" monstro(s).")
                quantCertas++;
            }else
            {
                alert("Que pena, você errou!!, foram: "+(perguntas["monstro"])+" monstro(s).");
                tempo = tempo +5;
            }
    }else{  
        if(sorteio == 12)
        {
            perg = prompt("Quantos cristais existiam nessa parte do planeta?") == (perguntas["obj-0"]);
                if(perg)
                {
                    alert("Muito bem, você acertou!!, eram: "+(perguntas["obj-0"])+" cristais.")
                    quantCertas++;
                }else
                {
                    alert("Que pena, você errou!!, eram: "+(perguntas["obj-0"])+" cristais.");
                    tempo = tempo +5;
                }
        }else{  
            //perguntas sobre flores 10 - 12
            if(sorteio == 13)
            {
                perg = prompt("Quantos arbustos azuis existiam nessa parte do planeta?") == (perguntas["obj-1"]);
                if(perg)
                {
                    alert("Muito bem, você acertou!!, eram: "+(perguntas["obj-1"])+" arbustos.")
                    quantCertas++;
                }else
                {
                    alert("Que pena, você errou!!, eram: "+(perguntas["obj-1"])+" arbustos.");
                    tempo = tempo +5;
                }
            }else{  
                if(sorteio == 14)
                {
                    perg = prompt("Quantas cercas existiam nessa parte do planeta?") == (perguntas["obj-2"]);
                    if(perg)
                    {
                        alert("Muito bem, você acertou!!, eram: "+(perguntas["obj-2"])+" cercas.")
                        quantCertas++;
                    }else
                    {
                        alert("Que pena, você errou!!, eram: "+(perguntas["obj-2"])+" cercas.");
                        tempo = tempo +5;
                    }
                }else{  
                     if(sorteio == 15)
                    {
                        perg = prompt("Quantos cogumelos existiam nessa parte do planeta?") == (perguntas["obj-3"]);
                        if(perg)
                        {
                            alert("Muito bem, você acertou!!, eram: "+(perguntas["obj-3"])+" cogumelos.")
                            quantCertas++;
                        }else
                        {
                            alert("Que pena, você errou!!, eram: "+(perguntas["obj-3"])+" cogumelos.");
                            tempo = tempo +5;
                        }
                    }else{  
                        if(sorteio == 16)
                        {
                            perg = prompt("Quantas plantas verdes existiam nessa parte do planeta?") == (perguntas["obj-4"]);
                            if(perg)
                            {
                                alert("Muito bem, você acertou!!, eram: "+(perguntas["obj-4"])+" plantas.")
                                quantCertas++;
                            }else
                            {
                                alert("Que pena, você errou!!, eram: "+(perguntas["obj-4"])+" plantas.");
                                tempo = tempo +5;
                            }
                        }else{  
                            
                        }
                    }
                }
            }
        }
    }
}                                         
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }        
        }

    }






   // console.log(perg);
   //var f =  game.add.sprite(game.camera.width-game.world.centerX+jogador.body.x, game.world.centerY-120, 'imagem_pontos');

   if(nivel!="02" && quantCertas>=3)
   {  
    		 var textoJogo = game.add.text(jogador.body.x, game.world.centerY, "Você passou de nivel", {
        font: "48px Arial",
        fill: "#ff0044",
        align: "center"
    }); 
}



    this.camera.onFadeComplete.addOnce(function () {
       
            proximoN = false;
			if(quantCertas >= 3)
            {
                
                if((nivel== "02" && recorde > tempo))
                {     

                    var nome =   prompt("Parabéns você bateu o recorde!, Digite seu nome:") ;
                        escreve(parseInt(tempo),nome);
                        proximoN = true;
                        recorde = tempo;
                        nivel ="01";
                        fim = true;
                        
                    this.game.state.restart(true, false, {});
                    
                // fimDoJogo();            
        
                
                }else
                {
                    if(nivel == "01")
                    {
                
                    proximoN = true;
                    nivel = "02";
                    pontos = pontos + 50;
                        pontosComeco = pontos;
                    this.game.state.restart(true, false, {});
                }else
                {
                       
                        fim = true;
                        comecar = false;
                        proximoN = true;

                           this.game.state.restart(true, false, {});
                }
                    
                }	
            }else
            {
                alert("Que pena!!, Você não acertou 60% das questões.");
               this.game.state.restart(true, false, {});
            }	
		
			//tempo = 0;
            
    }, this);


}


// ----------------------- Função jogadorVSchave  -------------///
function jogadorVSchave  (jogador, chave) {
   
    chave.kill();
	decoracao.remove(chave);	
    sfx.key.play();	
   // this.hasKey = true;
	PegouChave = true;
}

   
// ----------------------- Função jogadorVSchave  -------------///	
function spawnChave (x, y) {
    this.chave = this.decoracao.create(x, y, 'chave');
    this.chave.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.chave);
    this.chave.body.allowGravity = false;	
	
    //*Animação chave
        this.chave.y -= 3;
        this.game.add.tween(this.chave).to({y: this.chave.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut).yoyo(true).loop().start();	
}
		
		
// ----------------------- Função spawnPorta  -------------///			
function spawnPorta  (x, y) {
    this.porta = this.decoracao.create(x, y, 'porta');
    this.porta.anchor.setTo(0.5, 1);
    this.game.physics.enable(this.porta);
    this.porta.body.allowGravity = false;
	this.porta.frame=0;
}
		
		


// ----------------------- Função jogadorVSmonstro  -------------///		
function jogadorVSmonstro (jogador, monstro) {
if (jogador.body.velocity.y > monstro.body.velocity.y+20) { 
   if(monstro.key == "monstro2")
   {
                jogador.body.velocity.y = -550;	
                 sfx.jump.play();
   }else
   {

     perguntas["monstro"] +=1; 
        monstro.kill();   
        pontos += 30;
        pontosTexto.text = 'Pontos: ' + pontos;
        sfx.stomp.play(); 
   }

}else{

    sfx.stomp.play();	
    // game.camera.flash(0xff0000, 500);
     game.camera.shake(0.02, 400);
            jogador.animations.stop();        
   this.game.add.tween(jogador).to({x: jogador.x, alpha: 0}, 200, null, true).onComplete.addOnce(fimDoJogo, this);

  
}
}



function Spider(game, x, y,img,veloc) {
    Phaser.Sprite.call(this, game, x, y, img);
    this.anchor.set(0.5); 
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
        this.body.bounce.y = 0.2;
        this.body.gravity.y = 400;
            this.body.collideWorldBounds = true;
             this.animations.add('left', [0,1], 10,true);
            this.animations.add('right', [2,3], 10, true);
           // this.animations.add('die', [0][0],10, true);
   // this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('right');

if(img == "monstro2")
{
    velot["monstro2"] = veloc;

 this.body.velocity.x = veloc;
}else
{
  
 velot["monstro"] = veloc;
 this.body.velocity.x = veloc;
}
   
   
    }


// inherit from Phaser.Sprite
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function () {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
      
        this.body.velocity.x = -velot[this.key]; // turn left
          this.animations.play('left');
    }
    else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = velot[this.key]; // turn right
            this.animations.play('right');
    }
};


// ----------------------- Função spawnMoedas  -------------///
 function spawnMoedas (moeda) {
    perguntas["moedas"] +=1; 
    if (moeda.image == "moeda")
    {
        perguntas["qtd-moeda"] +=1;
    }else
    {
        perguntas["qtd-moeda2"] +=1;
    }
    var auxMoedas = this.moedas.create(moeda.x, moeda.y, moeda.image);
    auxMoedas.anchor.set(0.5, 0.5);
	auxMoedas.animations.add('rotate', [0, 1, 2, 1], 6, true); // 6fps, looped
    auxMoedas.animations.play('rotate');
	game.physics.enable(auxMoedas);
    auxMoedas.body.allowGravity = false;
};


// ----------------------- Função pegarMoeda  -------------///
function pegarMoeda (jogador, moeda) {  
    sfx.coin.play();
if(moeda.key=="moeda")
{    pontos += 20;
     perguntas["moeda"] +=1; 
}else
{    
    perguntas["moeda2"] += 1; 
    pontos += 10;
}

    moeda.kill(); 
  


    pontosTexto.text = 'Pontos: ' + pontos;    
	moedas.remove(moeda);	
}


// ----------------------- Função loadLevel  -------------///
function loadLevel (data) 
{
  


    data.plataformas.forEach(spawnPlataformas, this);
    data.moedas.forEach(spawnMoedas, this);
    
    this.spiders = this.game.add.group();
    spawnPorta(data.porta.x, data.porta.y);
    spawnChave(data.chave.x, data.chave.y);	
    spawnMonstros(data);
    //data.decoracao.forEach(spawnDecoracao,this);
    spawnDecoracao(data);
}

// ----------------------- Função spawnMonstros  -------------///
function spawnDecoracao (data) {  
    var sorteados = [];

    for(var x = 0 ; x<7 ; x++)
    {
    var sorteio = Math.floor(Math.random() * 13);
        while (sorteados.indexOf(sorteio) >= 0) 
        {
        sorteio = Math.floor(Math.random() * 13);
        }
          sorteados.push(sorteio);

       data.decoracao.forEach((decor) => {   
           if(decor.id==sorteio)
           {
               perguntas["obj-"+decor.frame]++;
               decoracao2.create(decor.x, decor.y, decor.imagem,decor.frame); 
           }  
});
    }



        
   
  
    
    
    //decoracao2.create(decor.x, decor.y, decor.imagem,decor.frame);   
    
};

// ----------------------- Função spawnMonstros  -------------///
function spawnMonstros (data) {
    
    
    data.spiders.forEach(function (monstro) {

    perguntas["monstros"] +=1; 
    if (monstro.image == "monstro")
    {
        perguntas["qtd-monstro"] +=1;
    }else
    {
        perguntas["qtd-monstro2"] +=1;
    }

        var monstro = new Spider(this.game, monstro.x, monstro.y,monstro.image,monstro.veloc);
        this.spiders.add(monstro);
    }, this);
    
};


// ----------------------- Função spawnPlataformas  -------------///
function spawnPlataformas (plataforma) {
		
				for(var x = plataforma.x; x<=plataforma.fimX;x=x+29)
				{  	
				  var ground = plataformas.create(x,  plataforma.y, plataforma.image);
				  ground.body.immovable = true;    
				  //platform1.body.immovable = true;
				}
                if(plataforma.x != 0){
               spawnEnemyWall(plataforma.x, plataforma.y, 'left');
               spawnEnemyWall(plataforma.fimX, plataforma.y, 'right');
                }
				
		

/*
				 var ground = plataformas.create(plataforma.x,  plataforma.y, plataforma.image);
				  ground.body.immovable = true;*/
			 
}


function spawnEnemyWall (x, y, side) {
    let sprite = enemyWalls.create(x, y, 'invisible-wall');
    // anchor and y displacement
    sprite.anchor.set(side == 'left' ? 1 : 0, 1);
    // physic properties
    game.physics.enable(sprite);
  sprite.body.immovable = true;
    //sprite.body.allowGravity = false;

};