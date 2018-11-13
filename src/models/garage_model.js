var mongoose = require('../config/connection');

var Schema = mongoose.Schema;

var GarageSchema = new Schema({
    
    menu:{
        type:String
    },
    record:{
        type:String
    },
    filter:{
        type:String
    },
    appearance:{
        type:String
    },
    consumables:{
        type:String
    },
    ammunition:{
        type:String
    },
    equipment:{
        type:String
    },
    techTrees:{
        type:Object
    },
    chat:{
        type:String
    },
    storage:{
        type:String
    },
    shop:{
        type:String
    },
    yourTank:{
        type:String
    },
    upgrades:{
        type:String
    },
    crew:{
        type:String
    },
    crewSkills:{
        type:String
    },
    boosters:{
        type:String
    }

}, {
    timestamps:true
});

var GarageModel = mongoose.model('garage', GarageSchema, 'garage');

module.exports = GarageModel;


GarageModel.findOne({}, (err, success)=>{
    if(err)
        console.log("sothing went wrong!");
    else{ 
        if(success == null){
            var garage = {
                menu:"<p>Offers you the following options:</p>\n<p>- News (updates, offers, your recent battle results etc.)\n - Platoon (allows you to see who is inviting you or invites you have sent to platoon).\n - Account (you WOTB account info).\n- Clans (your clan information or clan invites received or sent).\n- Tournaments (info about tournaments you have been invited to) Disconnect from server.\n- Settings (allows you to customize the display and other settings).</p>\n<p>- Tip: Customize the settings to suit yourself and make gameplay more comfortable.  This can be done as follows:\n- Settings -> Controls -> Customize -></p>\n<p>- N.B. Make sure you select the “same control mode” and enable it.  This ensures you do not play players using the PC version if you are on a mobile device. This will help you have a better WR and more equal gaming experience.</p>\n<p>- Select as follows:</p>\n<p>Menu-> Settings -> Other -> Same Control Mode</p> \n<p>- Tasks:</p>\n<p>- There are two categories here:</p>\n<p>- Missions</p>\n<p>Missions allow you to earn assets once completed. Each mission gives you different assets and bonuses</p>.\n<p><b>- Tip: Pay attention to your missions and your bonus containers (located in the Shop area) as the more assets you get, the better you will be able to enjoy the game and your game play can be more effective.</b></p>",
                record:"<p>Your record in playing the game. The key performance indicators appear in “the Summary” tab as follows:</p>\n\n<p><b>Total Battles</b></p>\n<p><b>Victories</b> (this is your WR – win-rate)</p>\n<p><b>Average Damage Per Battle</b> your total damage divided by the number of battles you have fought</p>\n<p><b>Average XP per Battle</b> (this is the experience you gain per battle – this is earned for all battle activities: damage, kills, spotting, bouncing shots, assisting in damage etc.)</p>\n<p><b>Vehicles with Ace Tanker Badges</b> This is the number of vehicles you have Mastered.  A Golden “M” or mastery badge is awarded when you perform better in a battle better than 99% of all other players playing the same vehicle in the same period</p>\n<p><b>Military Honor:</b> The about of praises or complaints you get determines your ranking here</p>\n\n<p>Tip: You can get further detailed information on your performance in the other tabs, in particular it is good to look at “Statistics” and “Vehicles” tabs.</p>",
                filter:"<p>This allows you select different tank types to be displayed and selected from.  This is particularly import when you have a large number of tanks in your garage.  The filter allows you to select tanks as follows:</p>\n\n<p>- Nation</p>\n\n<p>- Tank Type</p>\n\n<p>- Tier</p>\n\n<p>- Premium versus Tech Line</p>\n\n<p>- XP multiplier</p>",
                appearance:"<p>This allows you select camouflage for your tank.</p>\n<p>Make sure you have camo matching map types – so summer for summer maps, winter for winter maps etc.</p>\n\n<p><b>Tip: Rare Camo works on ALL map types</b></p>",
                consumables:"<p>These enhance your tank’s performance during each battle.  There is a detailed description of what each consumable does available by simply clicking on it.</p>\n\n<p><b></b>Tip: Make sure you have as many consumables added to your tank as possible to ensure you have optimal battle performance.</p>",
                ammunition:"<p>Each tank (gun) usually has three different shell types available.  Normally they are as follows:</p>\n\n<p>AP, APCR and HE.</p>\n\n<p>AP (Armour Piercing) is what you use most of time and penetrates most tanks</p>\n<p>APCR  (Amour Piercing Composite Round)- a premium round, is used if a tank has particularly strong armour and you next extra pen (but it does less damage)</p>\n<p>HE - High Explosion which does the most damage but has low penetration so only use it on a tank with very light armour</p>\n\n<p>Additionally certain tanks have:</p>\n\n<p>HEAT – high explosive anti-tank round.  Like APCR it gives more penetration but does less damage.HESH – high explosive squash head. Big penetration and big damage (only available on tanks in higher tiers)</p>\n\n<p><b>Tip: Make sure to balance your ammunition load-out.  Usually, approx. 65% AP, 25% APCR and 10% HE is a good balance but depending on your tank and gun this may vary.  You will learn what works best with different tanks as you play more.</b></p>",
                equipment:"<p>There are 18 different equipment options that allow you select 9 to mount on your tank.  They cover three main areas:</p>\n\n<p>Combat Power</p>\n<p>Vitality</p>\n<p>Specialization</p>\n\n<p>There are 3 levels that allow you select one piece of equipment from each of the 3 categories above.</p>\n\n<p>There is a detailed explanation available when you click on each one.</p>\n\n<p>You can unlock equipment using credits.</p>\n\n<p><b>Tip: The best equipment load out on each tank is complicated and often down to your style of game play.  As you get more proficient with the game you will learn how to best equip your tanks.  However, a simple rule when starting is to have as much equipment mounted as possible on your tank.  So instead of having 3 tanks for 3 pieces of equipment, have 1 tank with 9 pieces of equipment as this will make the tank more effective and give you a better chance of performing well.</b></p>",
                techTrees:"<p>This allows you to look through all the tanks available to the different nations.  It also shows the premium tanks available.  The tech tree is great for allowing you to plot a course to the higher tiers.</p>\n\n<p><b>Tip:  Take some time to look at the different tanks in the Tier you are playing even if you do not have them or have no intention of getting them. By knowing about the tanks you will face on the battlefield you will have a better chance of winning!</b></p>",
                chat:"<p>Takes you into the chat area where you can find other players (there is a search function), add friends, see friend requests sent to you and get information about clans, as well as being able to apply to join a clan.</p>\n\n<p><b>Tip:  Try to join a clan as quickly as possible.  Pick one that is friendly to new players and offers help in becoming better.  Choose your clan carefully.  A clan that offers guidance, help, tips and is patient with new players is the one you want when you are learning the game.</b></p>",
                storage:"<p>This is where you keep the following:</p>\n\n<p>Certificates: these are earned or won in battles, chests or competitions and can be used for various different assets, such as Premium Account Time, Gold or Garage Slots</p>\n\n<p>Containers: (sometimes referred to as “chests” by players) They are won or bought or are given as part of events.  They contain assets and often tanks.</p>\n\n<p>Other: Many different assets are stored here, the most common being boosters.</p>\n\n<p><b>Tip: Check regularly to see if you have any boosters that can be installed to help you gain more experience, credits etc.</b></p>",
                shop:"<p>Here you can purchase the following:</p>\n\n<p>- Offers (Tanks, Bundles etc.)</p>\n<p>- Bundles (Combination offers such a Tank and Gold, or Gold and Credits etc.)</p>\n<p>- Gold</p>\n<p>Premium (Premium Account Time can be bought here – Premium Accounts allow you earn more credits and experience)</p>\n<p>- Vehicles (Premium Tanks can be bought here)</p>\n<p>- Boosters (Combat, XP and Crew Boosters can be bought here)</p>\n\n<p><b>XP (Battle Experience and Free XP) in your Account</b></p>\n\n<p><b>Credits in your Account</b></p>\n\n<p><b>Gold in your Account</b></p>",
                yourTank:"<p>This shows you your tank in details and allows you see all its aspects.  Pay attention to the gun, the rate of fire (ROF), the damage per shot, the penetration of each shell type, the armour profile and the reload time.</p>\n\n<p><b>Tip: Studying your tank and understanding its performance will lead to overall better gameplay.</b></p>",
                upgrades:"<p>Shows the experience you have with this tank.  This experience can be used to get improvements (the cost of which is shown when you click on the tank icon).</p>",
                crew:"<p>Shows how well trained the crew is on this particular tank.</p>\n\n<b><b>Tip: Try to get your crew to 100% as soon as possible as it makes the tank more effective.</b></p>",
                crewSkills:"<p>Crew Skills are applicable to all tanks and not just the one you are looking at – they transfer whenever you play any tank in your garage.</p>\n\n<p>There are 7 levels available in each crew skill type.</p>\n\n<p>There are four categories of crew skills which are the same as the four tank types and within each category there are 5 different skills.</p>\n\n<p>It is important to train your crew so pay attention to this area regularly.  The more skills your crew have, the better your gameplay will be.</p>\n\n<p>There is a description of each skill and the benefits it brings available by simply selecting it.</p>\n\n<p><b>Tip: You can choose the skill to be trained manually.  Skills will be learned faster if you pick a skill type and then play that tank type.  So if want to play heavy tanks, pick heavy tank skills to be trained.  Conversely, if you want to train a particular skill, play the tank type to which it relates.  If you pick a light tank skill and play only heavy tanks, training that skill will be slower.</b></p>",
                boosters:"<p>There are two categories of boosters – economic and combat.  Activating boosters gives you more credits, experience etc. and will help you get more valuable rewards for your game play.</p>\n\n<p><b>Tip: Check regularly if you can implement any boosters.  If you have boosters available it will be indicated by a “+” symbol.  Simply activate your boosters by selecting the category with the + and then selecting the available booster.</b></p>"
            }
            GarageModel.create(garage, (err, result)=>{
                if(err)
                    console.log("somthing went wrong!")
                else
                    console.log("Garage Successfully Added.");
            })
        }
    }
})