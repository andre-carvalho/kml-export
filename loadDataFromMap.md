
# Primeiro método

!!Não pode estar logado no google

Procurar este nome na aba Network (mapspro.gmeviewer)
Colocar um break no item: k._pageData
Imprimir no console o valor de k._pageData
Copiar o dado impresso para um arquivo data.js

O Find nos itens da aba Network deve encontrar algo como o link abaixo:

https://www.gstatic.com/mapspro/_/js/k=mapspro.gmeviewer.pt_BR.dvHo1tTfce8.O/m=gmeviewer_base/rt=j/d=0/rs=ABjfnFVIhOEN36X-2Hty5itnl6xYTNUECQ

## Outro método

Tentar usar a cURL para baixar a página inicial e em seguida interpretar o arquivo, copiando o conteúdo da variável _pageData. Em seguida interpretar este conteúdo para chegar aos dados, assim como o primeiro método.
Possivel problema: A coordenada pode não ser a correta, verificar contra o resultado do primeiro método.

curl 'https://drive.google.com/open?id=1Hp6z1S6nTyqUY3SrLnMhBCnOtR4cyjj6&usp=sharing' -L -H 'pragma: no-cache' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' -H 'upgrade-insecure-requests: 1' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36' -H 'x-chrome-uma-enabled: 1' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'cache-control: no-cache' -H 'authority: www.google.com' -H 'cookie: NID=118=dtexRFttpxBJbnxJlSSC2Q3yPytMk7TWppmBZTUYVSozMkyxSOUPtUTbt3Wd8kZlXR7e0wl1lZMaeBLZDpW1B60ao5dLMp3oFFo6k3BVdpD_4MuC-uDwJIZ79J5azAna; 1P_JAR=2018-1-12-21' -H 'x-client-data: CIW2yQEIprbJAQj6nMoBCKmdygEIqKPKAQ==' --compressed --output page/page.txt ;

