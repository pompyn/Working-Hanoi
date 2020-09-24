// Add Your Code Here...
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
        firstStack.disks.unshift(x);
    });
    displayStacks();
}

const displayStacks = () => {
    stackObj.forEach(x => {
        const stackContainer = document.querySelector(`#${x.name}`);
        stackContainer.innerHTML = '';
        x.disks.forEach(y => {
            const newDiv = document.createElement("div");
            newDiv.classList.add('disk');
            newDiv.classList.add(`disk_${y}`);
            stackContainer.appendChild(newDiv);
        });
    });
}

const moveSingleDisk = (size, stack) => {
    if (stack[stack.length - 1] < size) {
        return false
    }
    stack.push(size);
    return true;
}

const moveStack = (oldStack, newStack) => {
    const oldStackDisks = stackObj.find(x => x.name == oldStack).disks;
    const newStackDisks = stackObj.find(x => x.name == newStack).disks;

    const topOldDisk = oldStackDisks[oldStackDisks.length - 1];
    if (!topOldDisk) {
        alert('This stack does not have a disks');
        clearStacks();
        return;
    }

    if (!moveSingleDisk(topOldDisk, newStackDisks)) {
        alert('You cannot move the disk onto a smaller disk');
        clearStacks();
        return;
    }

    oldStackDisks.pop();
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
        clearStacks();
        return;
    }
    if (oldSelectedStack) {
        newSelectedStack = clickedStackId
    } else {
        oldSelectedStack = clickedStackId
    }

    if (oldSelectedStack && newSelectedStack) {
        moveStack(oldSelectedStack, newSelectedStack);
    }
}

init();
//Received assistance from tutor Ayodele Jackson