class BlockPoint{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    randomPoint() {
        this.x = Math.floor(Math.random() * max_x);
        this.y = Math.floor(Math.random() * max_y);
    }
    static isEqual(blockpoint1, blockpoint2){
        return blockpoint1.x == blockpoint2.x && blockpoint1.y == blockpoint2.y
    }
};
class part {
    constructor(BlockPoint){
        this.currentPosition = BlockPoint;
    }
    move(direction){
        switch (direction){
            case UP:
                this.currentPosition.y--;
                break;
            case DOWN:
                this.currentPosition.y++;
                break;
            case LEFT:
                this.currentPosition.x--;
                break;
            case RIGHT:
                this.currentPosition.x++;
                break;
        }
    }
    draw(){
        drawHead(this.currentPosition, "black")
    }
}

class head extends part{
    isCollided(){
        if (this.currentPosition.x >= max_x | this.currentPosition.y >= max_y | this.currentPosition.x < 0 | this.currentPosition.y < 0){
            console.log("Collision!")
            return true;
        }
        else{
            return false;
        }
    }
    move(direction){
        // update movement history
        if (posHistory.length >= snake.length){
            posHistory.shift();
        }
        posHistory.push(new BlockPoint(this.currentPosition.x, this.currentPosition.y));

        switch (direction){
            case UP:
                this.currentPosition.y--;
                break;
            case DOWN:
                this.currentPosition.y++;
                break;
            case LEFT:
                this.currentPosition.x--;
                break;
            case RIGHT:
                this.currentPosition.x++;
                break;
        }
    }
}

class tail extends part{}