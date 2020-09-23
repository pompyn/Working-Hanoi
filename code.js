// Add Your Code Here...
class disk {
    constructor(size) {
        this.size = size;
    }

    moveDisk(newStack) {
        const existingDisks = newStack.filter(x => x.size < this.size);
        if (existingDisks) {
            return false;
        }
        newStack.push(this);
        return true;
    }
}

const divs = document.querySelectorAll('.stack');

divs.forEach(el => el.addEventListener('click', event => {
    handleMouseClick(event);
}));

const stackObj = [
    { name: 'stackOne', disks: [] },
    { name: 'stackTwo', disks: [] },
    { name: 'stackThree', disks: [] }
];

const disks = [1, 2, 3, 4];
const startingStack = 'stackOne';

let oldSelectedStack = '';
let newSelectedStack = '';

const init = () => {
    //create 4 disks and add to the stack
    const diskLoop = disks;

    //get our first stack
    const firstStack = stackObj.find(x => x.name == startingStack);
    diskLoop.forEach(x => {
        firstStack.disks.push(new disk(x));
    });
    displayStacks();
}

const displayStacks = () => {
    stackObj.forEach(x => {
        const stackContainer = document.querySelector(`#${x.name}`);
        x.disks.forEach(y => {
            const newDiv = document.createElement("div");
            newDiv.classList.add('disk');
            newDiv.classList.add(`disk_${y.size}`);
            stackContainer.appendChild(newDiv);
        });
    });
}

const moveDisk = (oldStack, newStack) => {
    const topDisk = oldStack && oldStack[0];
    if (!topDisk) {
        //say there is no top disk
        clearStacks();
        return;
    }

    if (!topDisk.moveDisk(newStack)) {
        //say that you can't move the disk onto a smaller disk
        clearStacks();
        return;
    }

    oldStack.pop();

    displayStacks();
    clearStacks();
}

const clearStacks = () => {
    newSelectedStack = oldSelectedStack = '';
}

const handleMouseClick = (e) => {
    if (!e || !e.target || !e.target.id) {
        return;
    }
    const clickedStackId = e.target.id;

    if (oldSelectedStack == clickedStackId) {
        alert('Sorry, this is the same stack you already clicked.');
        return;
    }
    if (oldSelectedStack) {
        newSelectedStack = clickedStackId
    }
    oldSelectedStack = clickedStackId

    if (oldSelectedStack && newSelectedStack) {
        moveDisk(oldSelectedStack, newSelectedStack);
    }
}

init();

// function main() {

// }
// function towerClickEvent() {
//     const clickedTowerNode = towerClickEvent.target
//     const currentTarget = towerClickEvent.currentTarget
// }
// const TowerA = document.querySelector("#TowerA")
// const TowerB = document.querySelector("#TowerB")
// const TowerC = document.querySelector("#TowerC")
// const one = document.querySelector("one")
// const two = document.querySelector("two")
// const three = document.querySelector("three")
// const four = document.querySelector("four")
// TowerA.addEventListener("click", function (towerClickEvent) {
//     const clickedTowerNode = towerClickEvent.target
//     console.log(towerClickEvent)
//     TowerA.append(towerClickEvent)

// })

// TowerB.addEventListener("click", function (towerClickEvent) {
//     const clickedTowerNode = towerClickEvent.target
//     console.log(towerClickEvent)
//     TowerB.append(towerClickEvent)

// })

// TowerC.addEventListener("click", function (towerClickEvent) {
//     const clickedTowerNode = towerClickEvent.target
//     TowerC.append(towerClickEvent)
// })
