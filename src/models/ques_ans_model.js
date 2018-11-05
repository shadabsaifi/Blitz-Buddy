var mongoose = require('../config/connection');

var Schema = mongoose.Schema;

var StaticQuesAns = new Schema({
    
    welcome:{ type:String },
    armouredPantz:{
        ques:{ type:String },
        ans:{ type:String }
    },
    blitzhunger:{
        type:Array
    },
    link:{ type:String },
    doAndDont:{ 
        type:Array
    },
    gameMechanics:{
        welcome:{ type:String },
        Queslink:{ type:Array }
    }

}, {
    timestamps:true
});

var StaticQuesAns = mongoose.model('staticQuesAns', StaticQuesAns, 'StaticQuesAns');

module.exports = StaticQuesAns;

StaticQuesAns.findOne({}, (error, success) => {
    if (error) {
        console.log(error)
    }
    else {
        if(success == null){
            new StaticQuesAns({
                welcome:"Hi and welcome to Blitz Buddy.  Here you will find all sorts of useful information that will make your WOT Blitz playing experience significantly better AND make you a better player.Blitz Buddy is a cool support tool based on Armoured_Pantz World of Tanks Blitz YouTube channel which is one of the largest Blitz channel’s in the world.So apart from cool content within the app itself you will also be to use the app to navigate the very best of video content that will truly enhance your Blitz interaction and skills while also providing some fun and laughs along the way! Happy Tanking! Armoured_Pantz",
                armouredPantz: { ques:'Who is Armoured Pantz ?', ans:"First off – I am an ordinary player like you!  UNLIKE you, I made some TRULY TERRIBLE mistakes when I started playing WOT Blitz. Why unlike you?  Well if you’re reading this you are already on your way to avoiding ALL or most of the mistakes I made. I started playing Blitz in 2016 and I did not understand the game, its complexities or its objectives and I was terrible!  I really sucked!  And I made about every mistake you can make! After playing 4000 games I sucked.  After 8000 games I was only marginally better.  Then I saw the light and started looking for some help.  Now after 60,000 games across all my accounts I want to share all my hard-earned and painful lessons and experiences with you. They say the only way to avoid mistakes is through experience – but the only way to get experience is by making mistakes.  By learning from all my mistakes you can gain that valuable experience and really enjoy WOT Blitz, which is a really fantastic game and one that will provide you with huge amounts of entertainment and joy!"},              
                blitzhunger:[
                    { ques:"What is it ?", ans:"Blitzhangar is a fantastic tool that allows you explore essential WOTB information. It's particularly brilliant in provinding you with detailed information on tanks." },
                    { ques:"How it works ?", ans:"When you open Blitzhangar you can access information on any tankin the WOTB universe using two methods. -Simply type in the tank name and hit 'search' -Use the filter to narrow the list down and then select the tank you want to view. You can access this amazing tool directly by just clicking here Tip: Use this tool to understanding other tanks you'll face on the battlefield. The more you know about the enemy the better the player you will be!" }
                ],
                link:"www.xyz.com",
                doAndDont:[ 
                    { ques:"Do's in WOTB", ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, 
                    { ques:"Don't in WOTB", ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." } 
                ],
                gameMechanics:{ 
                    welcome:"WOTb is a complex game. This complexity derives in a large part from the game 'mechanics'. Therefore, if you understand these mechanics before you start playing you will be better at the game and enjoy it far more!. Yip: If you watch these three simple videos from War gaming, you WILL start the game with a Huge advantage over other players. ",
                    Queslink:[
                        { ques:"Armour Penetration (Shell Types)", link:"https://youtu.be/UFktFSJZPsQ" },
                        { ques:"Visibility Mechanics (Spotting)", link:"https://youtu.be/7qrQ1UPltXg" }
                    ]
                }
                }).save((error, success) => {
                console.log("Successfully Added Static Questions");
            })

        }   
    }
})

                