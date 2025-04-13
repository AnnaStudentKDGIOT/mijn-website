from flask import Flask, render_template

app = Flask(__name__)

# Voorbeeld verzameling van elementen
users = {
    "jos.vermeulen": {
        "naam": "Kermit the Frog",
        "leeftijd": 69,
        "characterbio": "Kermit the Frog is een sympathieke en geduldige kikker die geliefd is bij jong en oud. Hij "
                        "is de leider van de Muppet Show en staat bekend om zijn kalme en rationele benadering van "
                        "problemen. Kermit is een natuurtalent als het gaat om organiseren en zorgt ervoor dat de "
                        "show altijd soepel verloopt, ondanks de vele uitdagingen en hilarische situaties die zich "
                        "voordoen. Kermit's vriendelijkheid en empathie maken hem tot een geliefde figuur onder zijn "
                        "vrienden. Hij is altijd bereid om te luisteren en advies te geven, wat hem een betrouwbare "
                        "vriend maakt. Zijn relatie met Mrs. Piggy is soms ingewikkeld, maar zijn liefde en geduld "
                        "helpen hen om door elke storm heen te komen. Naast zijn werk in de show houdt Kermit ervan "
                        "om tijd door te brengen in de natuur. Hij geniet van rustige momenten bij de vijver, "
                        "waar hij kan ontspannen en nadenken over het leven. Zijn beroemde lied 'Rainbow Connection' "
                        "weerspiegelt zijn optimistische kijk op het leven en zijn geloof in de kracht van dromen. "
                        "Kermit blijft een bron van inspiratie voor velen, dankzij zijn integriteit, "
                        "humor en hartelijkheid.",
        "image": "https://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg"
    },
    "maria.jansen": {
        "naam": "Miss Piggy",
        "leeftijd": 47,
        "characterbio": "Mrs. Piggy is een glamoureuze en zelfverzekerde varken die bekend staat om haar talent voor "
                        "zingen en acteren. Ze heeft een passie voor mode en draagt altijd de meest stijlvolle "
                        "outfits, compleet met glitter en juwelen. Mrs. Piggy is een echte diva en houdt ervan om in "
                        "de schijnwerpers te staan, waar ze altijd straalt met haar charme en charisma. Naast haar "
                        "talenten op het podium is Mrs. Piggy ook een fervente karateka. Ze staat haar mannetje en is "
                        "niet bang om haar karatevaardigheden te gebruiken wanneer dat nodig is. Haar sterke wil en "
                        "vastberadenheid helpen haar om elke uitdaging te overwinnen, zowel op het podium als "
                        "daarbuiten. Mrs. Piggy heeft een romantische relatie met Kermit the Frog, en hoewel ze soms "
                        "jaloers en bezitterig kan zijn, is haar liefde voor hem oprecht en diepgaand. Samen hebben "
                        "ze veel avonturen beleefd en hoewel ze vaak kibbelden, is hun band onverbrekelijk. Mrs. "
                        "Piggy droomt ervan om ooit een grote filmster te worden en werkt hard om haar dromen waar te "
                        "maken, altijd met Kermit aan haar zijde.",
        "image": "https://upload.wikimedia.org/wikipedia/en/2/22/MissPiggy.jpg"
    },
    "peter.klaassen": {
        "naam": "Bobo de Beer",
        "leeftijd": 28,
        "characterbio": "Bobo de Beer is een vriendelijke en nieuwsgierige beer die graag nieuwe avonturen beleeft. "
                        "Hij woont in een gezellig huisje midden in het bos, omringd door hoge bomen en kleurrijke "
                        "bloemen. Bobo heeft een grote voorliefde voor honing en brengt vaak uren door met het zoeken "
                        "naar de beste honingraten. Zijn beste vriend is een kleine vogel genaamd Twietje, "
                        "die hem vaak gezelschap houdt tijdens zijn avonturen. Bobo de Beer is niet alleen "
                        "nieuwsgierig, maar ook erg behulpzaam. Wanneer zijn vrienden in het bos hulp nodig hebben, "
                        "is Bobo altijd de eerste die komt helpen. Of het nu gaat om het repareren van een kapotte "
                        "brug of het vinden van verloren voorwerpen, Bobo staat altijd klaar met een glimlach en een "
                        "oplossing. Zijn vriendelijkheid en vastberadenheid maken hem geliefd bij iedereen in het "
                        "bos. Op een zonnige dag besloot Bobo een picknick te organiseren voor al zijn vrienden. Hij "
                        "bereidde een mand vol met lekkernijen zoals bessen, noten en natuurlijk honing. Samen met "
                        "Twietje nodigde hij iedereen uit voor een heerlijke middag vol eten, spelletjes en verhalen. "
                        "De picknick werd een groot succes en iedereen had een geweldige tijd dankzij Bobo's "
                        "genereuze en gastvrije aard.",
        "image": "https://upload.wikimedia.org/wikipedia/en/3/3f/Bobo_the_Bear.jpg"
    }
}

@app.route('/<username>')
def user_profile(username):
    user = users.get(username)
    if user:
        return render_template('index.html', user=user)
    else:
        return "User not found", 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
