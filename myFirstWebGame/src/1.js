var playerNum;
var playerId=["player1","player2","player3","player4","player5","player6","player7","player8"];
var cardId=[];
var washCardId=[];
var playerCardId=[[],[],[],[],[],[],[],[]];
var playerRank=[[],[],[],[],[],[],[],[],[]];//用于存储卡牌大小
var playerFlower=[[],[],[],[],[],[],[],[],[]];//用于存储花色；0，1，2，3对应黑红梅方
var playerMark=[];//用于存储每名玩家获得的分数
var rank=[];
var r=[];
var myCardId=[];
var lmyCardId=[];//用于复制myCardId
var cpExchangeId=[];
var cpExchangeIndex=[];
var myExchangeId=[];
var myExchangeIndex=[];
var isWashCard;
function startFunction(id)
{
    isWashCard=false;
    let startid=document.getElementById(id);
    startid.style.display='none';//隐藏“开始游戏”按钮
    document.getElementById("washcard").style.display="block";//显示洗牌按钮
    document.getElementById("givecard").style.display="block";//显示发牌按钮
    let s=prompt("请输入电脑玩家人数（至多8名）：\n友情提醒：玩家越少，胜率越高！(●ˇ∀ˇ●)")
    playerNum=parseInt(s);
    while(isNaN(playerNum)||s===''||playerNum<0||playerNum>8)
    {
        alert("输入不规范！请输入0~8");
        s=prompt("请输入玩家人数（除你以外且至多8名）：")
        playerNum=parseInt(s);
    }
    for(let i=0;i<playerNum;i++)//显示实际玩家方块
    {
        let playid=document.getElementById(playerId[i]);
        playid.style.display='block';
    }
    for(let i=1;i<=52;i++)//构造起始扑克id
    {
        cardId[i-1]="poker"+i;
    }
    document.getElementById("myCardBlock").style.display="block";
    document.getElementById("tipOfMyCard").style.display="block";
    writePoker();
}
function writePoker()
{
    for(let i=0;i<cardId.length;i++)
    {
        let id=document.getElementById(cardId[i]);
        id.style.backgroundColor="white";
        if(i<13)
        {
            let flowerid=document.getElementById(cardId[i]+"flower");
            flowerid.innerHTML="♠";
        }
        else if(i<26)
        {
            let flowerid=document.getElementById(cardId[i]+"flower");
            id.style.color="red";
            flowerid.innerHTML="♥";
        }
        else if(i<39)
        {
            let flowerid=document.getElementById(cardId[i]+"flower");
            flowerid.innerHTML="♣";
        }
        else if(i<52)
        {
            let flowerid=document.getElementById(cardId[i]+"flower");
            id.style.color="red";
            flowerid.innerHTML="♦";
        }
        let n=(i+3)%13;//将A变成最大的数
        let valueid=document.getElementById(cardId[i]+"value");
        switch (n)
        {
            case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:valueid.innerHTML=(n-1).toString();break;
            case 12:valueid.innerHTML="J";break;
            case 0:valueid.innerHTML="Q";break;
            case 1:valueid.innerHTML="K";break;
            case 2:valueid.innerHTML="A";break;
            default:alert("switch出现异常");break;
        }
    }
    document.getElementById("startCardsBlock1").style.display="block";
}
function washCard()
{
    document.getElementById("startCardsBlock1").style.display="none";
    document.getElementById("startCardsBlock2").style.display="block";
    washCardId=cardId;
    washCardId.sort(function (x,y) {
        if(Math.round(Math.random()*1000)<Math.round(Math.random()*1000))
            return -1;
        if(Math.round(Math.random()*1000)<Math.round(Math.random()*1000))
            return 1;
        return 0;
    });
    isWashCard=true;
    alert("洗牌完成");
    document.getElementById("washcard").style.display="none";
}
var giveNum=1;
var k1,k2;
function giveCard()
{
    if(!isWashCard)
    {
        alert("啊这\n什么意思？\n牌都没洗就想发牌\n这边建议先洗牌呢，亲！");
        return;
    }
    document.getElementById("givecard").style.display='none';
    for(let i=0;i<playerNum;i++)
    {
        for(let j=0;j<5;j++)
        {
            playerCardId[i][j]=washCardId[i*5+j];
        }
    }
    myCardId=washCardId.slice(playerNum*5,playerNum*5+5);
    lmyCardId=myCardId.slice();//复制myCardId，因为是数组是对象，直接画等号则lmyCardId和myCardId指向同一块地址，所以用slice完成复制操作
    k1=setInterval("giveC()",100);
}
function giveC()
{
    let ch=document.getElementById("startCardsBlock2");
    let list=document.getElementById("player"+giveNum+"CardBlock");
    list.appendChild(ch.children[ch.children.length-1]);
    if(giveNum===playerNum&&list.children.length===5)
    {
        window.clearInterval(k1);
        k2=setInterval("giveMy()",100);
    }
    if(list.children.length===5){ giveNum++;}
}
function giveMy()
{
    let ch=document.getElementById("startCardsBlock2");
    ch.removeChild(ch.children[ch.children.length-1]);//删除
    let id=document.getElementById(lmyCardId.shift());
    let list=document.getElementById("myCardBlock");
    list.appendChild(id);
    if(list.children.length===5){
        window.clearInterval(k2);
        setTimeout("exchange()",100);
    }
}
function exchange()//1
{
    alert('发牌完成\n下面进入换牌阶段');
    CPexchanged();
}
var ex=1;
var k3;
function CPexchanged()//2
{
    document.getElementById("output").style.display='block';
    k3=setInterval("CPex()",800);
}
function CPex()//3
{
    document.getElementById("output").innerHTML="玩家"+ex+"正在换牌...";
    ex++;
    if(ex>playerNum)
    {
        window.clearInterval(k3);
        setTimeout("ok()",800);
    }
}
function ok() //4
{
    document.getElementById("output").style.display='none';
    alert("电脑玩家换牌完成\n已经进入你换牌阶段了呢！");
    alert(`1.首先任意挑选一名电脑玩家\n2.然后点击该电脑玩家名片\n3.再点击它任意张手牌和自己同等数量的手牌\n4.最后点击‘交换手牌’既可以进行交换`);
    for(let i=0;i<playerNum;i++)
    {
        let list=document.getElementById(playerId[i]);
        let list1=list.children[0];//一定要先将children赋值出来，不然不能当成document.getElementById使用，也就绑定不了onclick事件
        list1.onclick=function ()
        {
            cpExchangeIndex.push(i);
            list1.style.backgroundColor="bisque";
            let List=document.getElementById("ul");
            for(let k=0;k<playerNum;k++)
            {
                if(k===i) continue;
                let l=List.children[k];
                let ll=l.children[0];
                ll.onclick=function () {alert("你已经选定了1名玩家，不能再与其他玩家交换手牌");}
            }
            let list2=list.children[1];
            for(let j=0;j<list2.children.length;j++)
            {
                let c=list2.children[j];
                c.onclick=function ()
                {
                    c.style.backgroundColor="aqua";
                    cpExchangeId.push(playerCardId[i][j]);
                    cpExchangeIndex.push(j);
                }
            }
        }
    }
    let list=document.getElementById("myCardBlock");
    for(let j=0;j<list.children.length;j++)
    {
        let l=list.children[j];
        l.onclick=function ()
        {
            l.style.backgroundColor="aqua";
            myExchangeId.push(l.id);
            myExchangeIndex.push(j);
        }
    }
    document.getElementById("exchange").style.display='block';
    document.getElementById("reexchange").style.display='block';
}
function lastExchange()
{
    if(cpExchangeIndex.length<=1||myExchangeId.length<=0)
    {
        alert("你还未选择交换手牌\n请先选择交换手牌再进行交换");
        reExchange();
    }
    else if(cpExchangeId.length!==myExchangeId.length)
    {
        alert("交换数目不匹配！\n请重新交换");
        reExchange();
    }
    else
    {
        for(let i=0,j=1;i<myExchangeIndex.length&&j<cpExchangeIndex.length;i++,j++)
        {
            let k=myCardId[myExchangeIndex[i]];
            myCardId[myExchangeIndex[i]]=playerCardId[cpExchangeIndex[0]][cpExchangeIndex[j]];
            playerCardId[cpExchangeIndex[0]][cpExchangeIndex[j]]=k;
        }//已经完成交换
        let list=document.getElementById("myCardBlock");
        let l=list.children;
        for(let i=0;i<5;i++)
        {
            let x=list.removeChild(list.children[0]);
            document.getElementById("startCardsBlock1").appendChild(x);
            //list.replaceChild(document.getElementById(myCardId[i]),l[i]);
            //document.adoptNode(removeList[i]);
        }
        for(let i=0;i<5;i++)
        {
            list.appendChild(document.getElementById(myCardId[i]));
        }
        let list1=document.getElementById(playerId[cpExchangeIndex[0]]);
        let list2=list1.children[0];
        let list3=list1.children[1];
        list2.style.backgroundColor='red';
        for(let i=1;i<cpExchangeIndex.length;i++)
        {
            let l=list3.children[cpExchangeIndex[i]];
            l.style.backgroundColor='#85D0ED';
        }
        for(let i=0;i<myExchangeId.length;i++)
        {
            document.getElementById(myExchangeId[i]).style.backgroundColor='white';
        }
        //卡牌存储大小
        for(let i=0;i<playerNum;i++)
        {
            for(let j=0;j<5;j++)
            {
                playerRank[i][j]=(parseInt(playerCardId[i][j].substring(5))-1)%13;
                playerFlower[i][j]=Math.floor((parseInt(playerCardId[i][j].substring(5))-1)/13);
            }
        }
        playerRank[8]=myCardId.map(x=>(parseInt(x.substring(5))-1)%13);
        playerFlower[8]=myCardId.map(x=>Math.floor((parseInt(x.substring(5))-1)/13));
        alert("交换成功");
        document.getElementById("exchange").style.display='none';
        document.getElementById("reexchange").style.display='none';
        document.getElementById("giveresult").style.display='block';
    }
}
function reExchange()
{
    cpExchangeId=[];
    myExchangeId=[];
    let list1=document.getElementById(playerId[cpExchangeIndex[0]]);
    let l=list1.children[1];
    let lt=list1.children[0];
    lt.style.backgroundColor='red';
    for(let i=0;i<playerNum;i++)//同159~188行代码
    {
        let list=document.getElementById(playerId[i]);
        let list1=list.children[0];//一定要先将children赋值出来，不能不能当成document.getElementById使用，也就绑定不了onclick事件
        list1.onclick=function ()
        {
            cpExchangeIndex.push(i);
            list1.style.backgroundColor="bisque";
            let List=document.getElementById("ul");
            for(let k=0;k<playerNum;k++)
            {
                if(k===i) continue;
                let l=List.children[k];
                let ll=l.children[0];
                ll.onclick=function () {alert("你已经选定了1名玩家，不能再与其他玩家交换手牌");}
            }
            let list2=list.children[1];
            for(let j=0;j<list2.children.length;j++)
            {
                let c=list2.children[j];
                c.onclick=function ()
                {
                    c.style.backgroundColor="aqua";
                    cpExchangeId.push(playerCardId[i][j]);
                    cpExchangeIndex.push(j);
                }
            }
        }
    }
    for(let i=1;i<cpExchangeIndex.length;i++)
    {
        let ll=l.children[cpExchangeIndex[i]];
        ll.style.backgroundColor="#85D0ED";
    }
    let list2=document.getElementById("myCardBlock");
    for(let i=0;i<myExchangeIndex.length;i++)
    {
        let ll=list2.children[myExchangeIndex[i]];
        ll.style.backgroundColor="white";
    }
    cpExchangeIndex=[];
    myExchangeIndex=[];
}
function giveResult()
{
    for(let i=0;i<playerNum;i++)
    {
        let list=document.getElementById(playerId[i]+"CardBlock");
        for(let j=0;j<5;j++)
        {
            list.removeChild(list.children[0]);
        }
        for(let j=0;j<5;j++)
        {
            let r=document.getElementById(playerCardId[i][j]);
            list.appendChild(r);
        }
    }
    document.getElementById("startCardsBlock2").style.display='none';
    document.getElementById("startCardsBlock1").style.display='block';
    document.getElementById("giveresult").style.display='none';
    giveOutPut();
    for(let i=0;i<playerNum;i++)
    {
        let list=document.getElementById(playerId[i]);
        let l=list.children[2];
        l.style.display='block';
    }
    document.getElementById("myresultoutput").style.display='block';
}
function giveOutPut()//输出结果，判定胜负
{
    allSort();
    for(let j=0;j<playerNum;j++)
    {
        giveMark(j);
        let list=document.getElementById(playerId[j]);
        let l=list.children[2];
        switch (playerMark[j])
        {
        case 1:l.innerHTML="高牌:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 2:l.innerHTML="一对:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 3:l.innerHTML="两对:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 4:l.innerHTML="三条:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 5:l.innerHTML="顺子:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 6:l.innerHTML="同花:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 7:l.innerHTML="葫芦:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 8:l.innerHTML="四条:最大_"+transform(playerRank[j][4])+" | rank_";break;
        case 9:l.innerHTML="同花顺:最大_"+transform(playerRank[j][4])+" | rank_";break;
        default:alert("switch出现异常！");break;
        }
        playerMark[j]+=playerRank[j][4]*0.01;
    }
    giveMark(8);
    let l=document.getElementById("myresultoutput");
    switch (playerMark[8])
    {
        case 1:l.innerHTML="高牌:最大_"+transform(playerRank[8][4])+" | rank_";break;
        case 2:l.innerHTML="一对:最大_"+transform(playerRank[8][4])+" | rank_";break;
        case 3:l.innerHTML="两对:最大_"+transform(playerRank[8][4])+" | rank_";break;
        case 4:l.innerHTML="三条:最大_"+transform(playerRank[8][4])+" | rank_";break;
        case 5:l.innerHTML="顺子:最大_"+transform(playerRank[8][4])+" | rank_";break;
        case 6:l.innerHTML="同花:最大_"+transform(playerRank[8][4])+" | rank_";break;
        case 7:l.innerHTML="葫芦:最大_"+transform(playerRank[8][4])+" | rank_";break;
        case 8:l.innerHTML="四条:最大_"+transform(playerRank[8][4])+" | rank-";break;
        case 9:l.innerHTML="同花顺:最大_"+transform(playerRank[8][4])+" | rank_";break;
        default:alert("switch出现异常！");break;
    }
    playerMark[8]+=playerRank[8][4]*0.01;
    for(let i=0;i<playerNum;i++)
    {
        rank[i]={value:playerMark[i],index:i};
    }
    rank.push({value: playerMark[8],index: 8});
    rank.sort(function (x,y) {
        if(x.value<y.value) return 1;
        if(x.value>y.value) return -1;
        return 0;
    });
    for(let i=0;i<rank.length;i++)
    {
        r[rank[i].index]=i+1;
    }
    for(let i=0;i<playerNum;i++)
    {
        let list=document.getElementById(playerId[i]);
        let l=list.children[2];
        let m=l.innerHTML;
        l.innerHTML=m+r[i];
    }
    let m=document.getElementById("myresultoutput").innerHTML;
    document.getElementById("myresultoutput").innerHTML=m+r[8];
    if(r[8]===1)
    {
        setTimeout("alert(\"啊这！\\n你的Rank排名最高\\n恭喜你获得本局比赛胜利！！！\\n刷新网页即可再来一局\")",1000);
    }
    else
    {
        setTimeout(function () {
            let k=rank[0].index+1;
            alert("很遗憾！\n你的Rank排名为第"+r[8]+"\n最高Rank排名选手为玩家"+k+"\n很遗憾！比赛失败!\n刷新网页即可再来一局");
        },1000);
    }
}
function transform(k) //将0~12转换成2~A
{
    switch (k)
    {
        case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:return (k+2).toString();
        case 9:return 'J';
        case 10:return 'Q';
        case 11:return 'K';
        case 12:return 'A';
        default:alert("switch出现异常！!");break;
    }
}
function giveMark(i)
{
    if(isFourSame(i))
    {
        playerMark[i]=8;
        return;
    }
    if(isThreeSame_andPair(i))
    {
        playerMark[i]=7;
        return;
    }
    if(isSameFlower(i))
    {
        if(isSort(i)) playerMark[i]=9;//判断同花顺
        else playerMark[i]=6;
       return;
    }
    if(isSort(i))
    {
        playerMark[i]=5;
        return;
    }
    if(isThreeSame(i))
    {
        playerMark[i]=4;
        return;
    }
    if(twoPair(i))
    {
        playerMark[i]=3;
        return;
    }
    if(onePair(i))
    {
        playerMark[i]=2;
        return;
    }
    playerMark[i]=1;
}
function allSort() //将Rank大小从小到大排列
{
    for(let i=0;i<playerNum;i++)
    {
        playerRank[i].sort(function (x,y)
        {
            if(x<y) return -1;
            if(x>y) return 1;
            return 0;
        });
    }
    playerRank[8].sort(function (x,y)
    {
        if(x<y) return -1;
        if(x>y) return 1;
        return 0;
    });
}
function isFourSame(k) //判断是否为四条:8
{
    if(playerRank[k][0]===playerRank[k][1])
    {
        if(playerRank[k][1]!==playerRank[k][2]) return false;
        if(playerRank[k][2]!==playerRank[k][3]) return false;
        if(playerRank[k][3]!==playerRank[k][4]) return false;
        return true;
    }
    else
    {
        if(playerRank[k][1]!==playerRank[k][2]) return false;
        if(playerRank[k][2]!==playerRank[k][3]) return false;
        if(playerRank[k][3]!==playerRank[k][4]) return false;
        if(playerRank[k][4]!==playerRank[k][5]) return false;
        return true;
    }
}
function isThreeSame_andPair(k)//判断是否为葫芦:7
{
    let n=0;
    for(let i=0;i<4;i++)
    {
        if(playerRank[k][i]===playerRank[k][i+1]) n++;
    }
    return n===3;
}
function isSameFlower(k)//判断是否为同花:6
{
    for(let i=0;i<4;i++)
    {
        if(playerFlower[k][i]!==playerFlower[k][i+1])
        {
            return false;
        }
    }
    return true;
}
function isSort(k)//判断是否为顺子:5
{
    for(let i=0;i<4;i++)
    {
        if(playerRank[k][i+1]-playerRank[k][i]!==1)
        {
            return false;
        }
    }
    return true;
}
function isThreeSame(k) //判断是否为三条:4
{
    if(playerRank[k][0]===playerRank[k][1])
    {
        if(playerRank[k][1]!==playerRank[k][2]) return false;
        else return true;
    }
    if(playerRank[k][1]===playerRank[k][2])
    {
        if(playerRank[k][2]!==playerRank[k][3]) return false;
        else return true;
    }
    if(playerRank[k][2]===playerRank[k][3])
    {
        if(playerRank[k][3]!==playerRank[k][4]) return false;
        else return true;
    }
}
function twoPair(k) //判断两对:3
{
    let n=0;
    for(let i=0;i<4;i++)
    {
        if(playerRank[k][i]===playerRank[k][i+1]) n++;
    }
    return n===2;
}
function onePair(k) //判断1对:2
{
    let n=0;
    for(let i=0;i<4;i++)
    {
        if(playerRank[k][i]===playerRank[k][i+1]) n++;
    }
    return n===1;
}