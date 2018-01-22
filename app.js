new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns:[]
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack:function () {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text:'Player hits Monster for ' + damage
            })
            if(this.checkWin()){
                return;
            }
            //
            this.monsterAttack();
            this.checkWin();

        },
        specialAttack:function () {
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text:'Player hits Monster for ' + damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttack()
            this.checkWin();

        },
        heal: function () {
            var health = 10;
            if(this.playerHealth <= 90){
                this.playerHealth += health;
                this.turns.unshift({
                    isPlayer: true,
                    text:'Player is healing for ' + health + ' Health'
                })
            }else{
                this.playerHealth = 100;
            }
            this.monsterAttack();
        },
        giveUp: function () {
            if(confirm('You wanna Giveup?')){
                alert('You sucks.')
                this.turns = [];
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.gameIsRunning = false;
            }
        },
        restart: function () {
            if(confirm('You wanna Restart?')){
                this.startGame();
            }
        },
        monsterAttack:function () {
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text:'Monster hits Player for ' + damage
            })

        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if(this.monsterHealth <= 0){
                if(confirm('You Win!, Start New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <= 0){
                if(confirm('You Lost!, Start New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }

})