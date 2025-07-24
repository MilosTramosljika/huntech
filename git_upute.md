# 1. Proces dodavanja sadrzaja na specificnu udaljenu granu sa lokalnog repozitorijuma 

### 🔹 1. KLONIRAŠ REPOZITORIJUM (pozicioniraj se u zeljeni folder):

```bash
#preskoci ovaj dio ako si vec klonirao repozitorijum
git clone URL
cd ime-repozitorijuma
```
> Kada kloniramo udaljeni repozitorijum kreira se lokalna grana main i taj lokalni main automatski se poveze sa udaljenom main granom. Tako da nije potrebo povezivati lokalni i udaljeni main. To mozemo potvrdi i komandom koja pokazuje sve povezane logalne grane sa udaljenim granama:
```bash
git branch -vv

ili

#daje detaljniji pregled, objasnjena u nastavku
git remote show origin 

```
> Ostale grane moramo posebno povezivati. Npr. udaljenu granu nikola moramo spojiti sa nekom lokalnom granom (preporucljivo je da bude istog imena)
---

### 🔹 2. PROVJERI KOJE GRANE POSTOJE:

```bash
git branch -a
```

> Pokazaće ti lokalne i udaljene grane (`remotes/origin/ime-grane`)

---

### 🔹 3. Kada Kada kloniramo udaljeni repozitorijum na lokalni, vidimo samo `main` granu. 

Potrebno je sada kreirati novu granu koja se preporucljivo zove kao i specifirana udaljena grana na koju push-amo sadrzaj

#### 🔸 Data komanda kreira novu lokalnu granu i prebaci nas na tu granu. Takodje vrsi povezivanje sa udaljenom granom

```bash
git checkout -b naziv_lokalne_grane remotes/origin/naziv_udaljene_grane


#ako grana vec postoji tj. ako smo je mi vec kreirali na lokalnom repo. onda je postupak povezivanja sledeci:

git checkout specificna_lokalna_grana
git branch --set-upstream-to=remotes/origin/specifina_lokalna_grana
```

> Sada smo pozicionirani na datoj grani i povezani sa udaljenom granom

---

### 🔹 4. NAPRAVI IZMJENE, ZATIM COMMIT:

```bash
# napravi izmjene u fajlovima, zatim:
git add -A
git commit -m "Izmjene..."
```

---

### 🔹 5. PUSH-AMO SAMO TU GRANU:

```bash
git push origin naziv_lokalne_grane
```

> Ovo **push-uje samo lokalnu granu na udaljenu granu github repozitorijuma.

# 2. Proces merge-anja izmjene iz sporednih grana na glavnu granu main/master(na udaljenom repoziorijmu). Imamo dvije opcije:                     


## 🔹 1 (OPCIJA). Merge lokalno tj. merge sa sporedne lokalne grane na main lokalnu granu i onda push na udaljenu main granu:

### 🔸 1. Prvo trebamo provjerovati da li smo commit sve izmjene na sporednoj lokalnoj grani i lokalnoj main grani

### 🔸 2. Prebacimo se na lokalnu main granu
```bash
git checkout main
```
### 🔸 3. Povuci najnovije izmjene sa udaljenog repozitorijuma:
```bash
 #(git pull = git fetch + git merge)


#najbolji redoslijed je sledeci:
git checkout main 
git pull
git checkout trenutna_lokalna_grana
git pull #ovdje git fatch se nece ponoviti jer smo vec jednom odradili git pull ali se hoce odraditi git merge sa udaljene grane koja je povezana na trenutnu granu 


#(ALTERNATIVNO- preuzimamo promjene samo sa jedne grane i spajamo ih samo sa jednom granom. Rezultat isti kao i prethodni postupak, jer se svakako git fetch ne ponavlja 2 puta za iste promjene kao sto je gore i objasnjeno)
git checkout main 
git pull origin main
git checkout specificna_lokalna_grana
git pull origin specificna_lokalna_grana

```
Git pull je zapravo 2 komande u jednoj. Konkrentno git fetch i git merge. Git pull preuzima sve promjene iz udaljenog repozitorijuma, ali spaja promjene samo sa udaljene grane koja je povezana sa trenutnom lokalnom granom. Komanda git pull uvijek djeluje tj povlaci izmjene i merge,samo na granu na kojoj se trenutno nalazimo i ne smjemo uraditi git pull na grani koja nema remote povezivanje tj. nije povezana sa odgovarajucom udaljenom granom. Npr lokalni main je uvijek spojen sa udaljenim main, ali ostale grane trebamo posebno povezivati uz pomoc prethodno opisanog nacina. Komanda koja moze pomoci da provjerimo koje lokalne grane prate koje udaljene i sta ce se desiti ako pokrenemo git push i git pull na odgovarajucim granama je komanda:
```bash
git remote show origin
```
>Data komanda pokazuje:
>1. Gdje se nalazi tvoj udaljeni repozitorijum 
>2. Koja je glavna grana na udaljenom repozitorijumu
>3. Koje sve grane postoje na udaljenom repozitorijumu 
>4. Koje lokalne grane prate udaljene grane
>5. Sta se desava kada pokrenemo git push na odredjenim granama

### 🔸 4. Merge lokalne granu sa main
```bash
git checkout main
git merge specificna_lokalna_grana
```
### 🔸 5. Rijesi konflikte(ako postoje)
### 🔸 6. Push-aj spojenu main granu nazad na GitHub
```bash
git checkout main
git push origin main
```
## 🔹 2 (OPCIJA). Koristi Pull Request (na GitHubu)

### 🔸 1. Push-aj svoju lokalnu_specificnu_granu(ne main) na GitHub (ako već nisi):

```bash
git checkout specificna_lokalna_grana
git push origin specificna_lokalna_grana
```
### 🔸 2. Idi na GitHub.com i otvori repozitorijum
### 🔸 3. Na GitHub.com ces vidjeti “Compare & pull request” dugme → klikni
### 🔸 4. Pregledaj izmjene → klikni “Create pull request”
### 🔸 5. Klikni “Merge pull request”
### 🔸 6. Nakon toga, možeš lokalno ažurirati main:
```bash
git checkout main
git pull origin main

#ovjerimo da je sve u redu sa komandom:
git remote show origin 
```


# 3. Postupak rjesavanja Git konflikta:

### 🔸 1. Nakon:

```bash
git merge specificna_lokalna_grana
```

> potencijalno se moze dogoditi git conflict.
Definicija git conflicta:
Konflikt se dešava kada Git ne može automatski spojiti (merge-ovati) dvije verzije fajla — jer su isti dijelovi promijenjeni u različitim granama.
Npr. imamo fajl file1.txt u main grani i fajl file1.txt u specificnoj_lokalnoj_grani. Ako prva linija tog fajla u main grani bude "hello world", a prva linija tog fajla u specificnoj_lokalnoj_grani bude "dobar dan" onda ce doci git conflicta. 

>Ako si zakljucio da si ti negdje napravio gresku i neces da razrijesavas konflikt mozes koristi komandu:
```bash
#moze se koristi samo ako nismo jos pokusali rijesavati konflikt ili commit-ovali projene 
git merge --abort
```
>Data komadna ce ponistiti cijeli merge i vratiit nas na stanje grane (npr. main) prije merge pokusaja tj. kao da se nista nije desilo



### 🔸 2. Automatski ce nam se otvoriti konfliktni fajl, ili mi sami ga otvorimo(koristi vscode, najjednostavnija opcija):

> Imacemo nesto ovako:

```
<<<<<<< HEAD
ovo je sadržaj u tvojoj grani (npr. main)
=======
ovo je sadržaj iz grane koju spajaš (npr. nikola)
>>>>>>> nikola
```

> Treba odabrati jednu od opcija:
Accept current Change, Accept incoming change, accept both changes...
Ili mi razrijesimo conflict na neki svoj nacin. Ako sami rucno rijesavamo konlikt potrebno je obrisati konfilktne oznake <<<< >>>> ==== i sacuvati izmjene (Crtl+S).

### 🔸 3. Commitujemo rjesenje konflikta

```bash
git commit -a -m "Razrijesen konflikt"
```
### 🔸 4. Push-amo izmjene na udaljeni repo.

```bash
git push origin main
```