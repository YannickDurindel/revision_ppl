window.PPL = window.PPL || { subjects: [] };
window.PPL.subjects.push({
  id: "020",
  title: "Connaissance de l’aéronef",
  subtitle: "Cellule, moteur, systèmes et instruments",
  theory: [
    {
      h: "Cellule, commandes de vol, train et freins",
      body: "<p>La <strong>cellule</strong> comprend le fuselage, la voilure, les empennages et le train. Trois grands types de structure :</p>" +
        "<ul><li><strong>Treillis</strong> (tubes soudés entoilés) : la structure interne reprend tous les efforts, le revêtement est non travaillant.</li>" +
        "<li><strong>Monocoque</strong> : le revêtement seul reprend les efforts.</li>" +
        "<li><strong>Semi-monocoque</strong> (la plus répandue) : revêtement travaillant renforcé par des <strong>cadres</strong> et des <strong>lisses</strong>.</li></ul>" +
        "<p>Dans l’aile, le <strong>longeron</strong> reprend l’essentiel des efforts de <strong>flexion</strong> ; les <strong>nervures</strong> donnent le profil et transmettent les charges au longeron.</p>" +
        "<table><thead><tr><th>Gouverne</th><th>Axe</th><th>Mouvement</th><th>Commande</th></tr></thead><tbody>" +
        "<tr><td>Ailerons</td><td>Longitudinal (roulis)</td><td>Inclinaison</td><td>Manche à gauche / droite</td></tr>" +
        "<tr><td>Profondeur</td><td>Transversal (tangage)</td><td>Cabré / piqué</td><td>Manche avant / arrière</td></tr>" +
        "<tr><td>Direction</td><td>Vertical (lacet)</td><td>Lacet</td><td>Palonnier</td></tr></tbody></table>" +
        "<ul><li>Les ailerons sont braqués en sens inverse ; le <strong>lacet inverse</strong> est réduit par des <strong>ailerons différentiels</strong> (l’aileron qui monte se braque davantage).</li>" +
        "<li>Les <strong>masses d’équilibrage</strong> placées en avant de l’axe d’articulation préviennent le <strong>flottement (flutter)</strong>.</li>" +
        "<li>Le <strong>compensateur (tab)</strong> annule l’effort au manche ; il se braque <strong>en sens opposé à la gouverne</strong> qu’il compense.</li>" +
        "<li><strong>Volets de courbure</strong> : augmentent la portance et la traînée, permettent de voler plus lentement (approche plus pentue à vitesse plus faible).</li></ul>" +
        "<p><strong>Train d’atterrissage et freins</strong></p>" +
        "<ul><li><strong>Train tricycle</strong> : roulette de nez, centre de gravité <strong>en avant</strong> des roues principales : stable au sol, bonne visibilité.</li>" +
        "<li><strong>Train classique</strong> (roulette de queue) : centre de gravité <strong>en arrière</strong> des roues principales : instable en lacet au sol, risque de <strong>cheval de bois</strong>.</li>" +
        "<li>Amortisseurs : lames ressort, sandows ou <strong>oléopneumatiques</strong> (huile + azote/air).</li>" +
        "<li>Les <strong>repères de glissement</strong> peints sur pneu et jante permettent de vérifier que le pneu n’a pas tourné sur la jante.</li></ul>" +
        "<p><strong>Freins</strong> : généralement à <strong>disques</strong>, commande <strong>hydraulique</strong> par la pointe des palonniers. Le freinage <strong>différentiel</strong> (gauche/droite séparés) aide à diriger l’avion au sol. Un usage prolongé provoque un échauffement et une perte d’efficacité (<strong>fading</strong>). Le frein de parc ne se serre pas pour un stationnement long à chaud.</p>"
    },
    {
      h: "Moteur à pistons : cycle 4 temps et allumage",
      body: "<p>Moteur à pistons, généralement à <strong>cylindres opposés à plat</strong> et refroidi par air. Cycle <strong>Otto à 4 temps</strong> : un cycle = <strong>2 tours de vilebrequin</strong>.</p>" +
        "<ol><li><strong>Admission</strong> : soupape d’admission ouverte, le piston descend.</li>" +
        "<li><strong>Compression</strong> : soupapes fermées, le piston monte.</li>" +
        "<li><strong>Combustion-détente</strong> : étincelle un peu <strong>avant le point mort haut</strong> (avance), seul temps moteur.</li>" +
        "<li><strong>Échappement</strong> : soupape d’échappement ouverte, le piston remonte.</li></ol>" +
        "<p><strong>Allumage</strong> : <strong>double allumage</strong> par <strong>deux magnétos indépendantes</strong> et <strong>deux bougies par cylindre</strong> : sécurité et meilleure combustion.</p>" +
        "<ul><li>Les magnétos produisent leur propre courant : elles sont <strong>indépendantes du circuit électrique</strong> de l’avion (couper batterie et alternateur n’arrête pas le moteur).</li>" +
        "<li>Contacteur sur OFF : le primaire de la magnéto est mis à la masse. Si ce fil de masse est coupé, la magnéto reste <strong>active</strong> : danger en tournant l’hélice à la main.</li>" +
        "<li><strong>Essai magnétos</strong> : légère chute de régime sur chaque magnéto (valeurs maximales et écart dans le manuel de vol). <strong>Aucune chute</strong> sur une magnéto peut indiquer une <strong>mise à la masse défectueuse</strong>.</li>" +
        "<li><strong>Détonation</strong> : combustion explosive du mélange après l’étincelle (mélange trop pauvre, carburant d’indice trop faible, température excessive). <strong>Auto-allumage</strong> : inflammation avant l’étincelle par un point chaud.</li></ul>"
    },
    {
      h: "Carburateur, givrage, mélange et injection",
      body: "<p>Le <strong>carburateur</strong> mélange l’air et l’essence grâce à la dépression créée au <strong>venturi</strong>. Le <strong>papillon des gaz</strong> règle la quantité de mélange admise.</p>" +
        "<p><strong>Givrage carburateur</strong> : la vaporisation de l’essence et la détente de l’air au venturi abaissent fortement la température (chute pouvant dépasser <strong>20 °C</strong>).</p>" +
        "<ul><li>Possible par température extérieure d’environ <strong>-10 °C à +30 °C</strong>, risque maximal avec une <strong>forte humidité</strong>, même par ciel clair.</li>" +
        "<li>Plus probable à <strong>puissance réduite</strong> (papillon presque fermé), par exemple en descente.</li>" +
        "<li>Symptômes : sur hélice à pas fixe, <strong>baisse du régime</strong> (tr/min) puis fonctionnement irrégulier.</li></ul>" +
        "<p><strong>Réchauffage carburateur</strong> : admet de l’air chaud <strong>non filtré</strong> pris autour de l’échappement. L’air chaud est moins dense : le mélange <strong>s’enrichit</strong> et la puissance <strong>diminue</strong>. S’il y avait de la glace : chute de régime, irrégularités pendant la fonte, puis <strong>remontée</strong> du régime. Utiliser à fond (pas à moitié) et éviter au sol (poussières).</p>" +
        "<p><strong>Mélange (richesse)</strong> : rapport idéal voisin de <strong>1/15</strong> en masse. En altitude l’air est moins dense alors que le débit d’essence reste le même : le mélange <strong>s’enrichit</strong>, il faut <strong>appauvrir</strong>. Trop pauvre : températures élevées, détonation. Trop riche : perte de puissance, encrassement des bougies, surconsommation. La commande de mélange plein pauvre sert aussi à <strong>arrêter le moteur</strong>.</p>" +
        "<p><strong>Injection</strong> : l’essence est injectée près des soupapes d’admission. Pas de venturi ni de vaporisation dans le carburateur, donc <strong>pas de givrage carburateur</strong> (le givrage de la prise d’air reste possible), meilleure répartition du mélange. Inconvénient : redémarrage à chaud parfois difficile (<strong>vapor lock</strong>).</p>"
    },
    {
      h: "Carburant, lubrification et refroidissement",
      body: "<table><thead><tr><th>Carburant</th><th>Couleur</th></tr></thead><tbody>" +
        "<tr><td><strong>AVGAS 100LL</strong> (Low Lead)</td><td><strong>Bleue</strong></td></tr>" +
        "<tr><td>AVGAS 100</td><td>Verte</td></tr>" +
        "<tr><td>JET A-1 (kérosène, turbines et diesels)</td><td>Incolore à paille</td></tr></tbody></table>" +
        "<ul><li>Utiliser uniquement les carburants autorisés par le <strong>manuel de vol</strong> ; un indice d’octane trop faible favorise la <strong>détonation</strong>.</li>" +
        "<li>L’<strong>eau</strong>, plus lourde que l’essence, se dépose <strong>au point bas</strong> des réservoirs : effectuer les <strong>purges</strong> avant le premier vol et après chaque avitaillement, jusqu’à obtenir un carburant pur.</li>" +
        "<li>Remplir les réservoirs le soir limite la condensation. Mise à la masse de l’avion lors de l’avitaillement (électricité statique).</li>" +
        "<li>La <strong>mise à l’air libre</strong> des réservoirs doit être dégagée, sinon dépression et désamorçage.</li></ul>" +
        "<p><strong>Huile</strong> : lubrifie, <strong>refroidit</strong>, nettoie, assure l’étanchéité et protège de la corrosion. Contrôler le niveau avant le vol ; la <strong>pression d’huile</strong> doit monter dans les secondes suivant le démarrage (environ 30 s), sinon couper le moteur. Pression basse + température haute = risque de panne moteur imminente.</p>" +
        "<p><strong>Refroidissement par air</strong> : ailettes des cylindres, déflecteurs et éventuellement <strong>volets de capot</strong> (cowl flaps). Le refroidissement est moins efficace à <strong>forte puissance et faible vitesse</strong> (montée prolongée). Un mélange plus riche refroidit davantage.</p>"
    },
    {
      h: "Hélice",
      body: "<ul><li>Le <strong>calage</strong> (angle de calage) est l’angle entre la corde du profil de pale et le plan de rotation.</li>" +
        "<li>La pale est <strong>vrillée</strong> : le calage <strong>diminue du moyeu vers l’extrémité</strong>, car la vitesse de rotation augmente avec le rayon ; on garde ainsi une incidence à peu près constante le long de la pale.</li>" +
        "<li><strong>Pas fixe</strong> : calage figé, compromis entre montée (petit pas) et croisière (grand pas). La manette des gaz commande le <strong>régime (tr/min)</strong>, lu au compte-tours.</li>" +
        "<li><strong>Pas variable à vitesse constante</strong> : un régulateur maintient le régime choisi. La <strong>manette d’hélice</strong> règle le <strong>régime</strong>, la <strong>manette des gaz</strong> règle la <strong>pression d’admission</strong>.</li>" +
        "<li>Petit pas / grand régime pour le décollage et la remise de gaz ; grand pas / petit régime en croisière. Pour augmenter la puissance : <strong>mélange, hélice, puis gaz</strong> ; pour la réduire : <strong>gaz, puis hélice</strong> (éviter forte admission avec faible régime).</li></ul>"
    },
    {
      h: "Circuit électrique",
      body: "<ul><li>Tension courante <strong>12 V ou 24 V</strong>, courant continu. Source principale : l’<strong>alternateur</strong> entraîné par le moteur ; la <strong>batterie</strong> sert au démarrage et de secours.</li>" +
        "<li><strong>Ampèremètre</strong> central : indique la charge (+) ou la décharge (−) de la batterie. Une <strong>décharge permanente moteur tournant</strong> indique une <strong>panne d’alternateur</strong> : délester les équipements non essentiels, la batterie seule ne tient qu’un temps limité.</li>" +
        "<li>Les <strong>disjoncteurs</strong> (ou fusibles) protègent les circuits contre les surintensités. Un disjoncteur sauté peut être réarmé <strong>une seule fois</strong> après quelques instants ; s’il saute de nouveau, ne pas insister (risque d’incendie).</li>" +
        "<li>Le <strong>contacteur général (master)</strong> isole la batterie. Il n’agit pas sur l’allumage (magnétos).</li></ul>"
    },
    {
      h: "Instruments anémobarométriques",
      body: "<p>Ils utilisent la <strong>pression totale</strong> (tube de <strong>Pitot</strong>) et la <strong>pression statique</strong> (prises statiques).</p>" +
        "<table><thead><tr><th>Instrument</th><th>Pitot</th><th>Statique</th><th>Principe</th></tr></thead><tbody>" +
        "<tr><td>Anémomètre</td><td>Oui</td><td>Oui</td><td>Pression dynamique = totale − statique</td></tr>" +
        "<tr><td>Altimètre</td><td>Non</td><td>Oui</td><td>Capsule anéroïde</td></tr>" +
        "<tr><td>Variomètre</td><td>Non</td><td>Oui</td><td>Variation de pression statique (fuite calibrée)</td></tr></tbody></table>" +
        "<p><strong>Codes couleurs de l’anémomètre</strong> :</p>" +
        "<table><thead><tr><th>Repère</th><th>Signification</th></tr></thead><tbody>" +
        "<tr><td>Arc blanc</td><td>De <strong>VS0</strong> (décrochage en configuration atterrissage) à <strong>VFE</strong> (vitesse max volets sortis)</td></tr>" +
        "<tr><td>Arc vert</td><td>De <strong>VS1</strong> (décrochage lisse) à <strong>VNO</strong> : plage d’utilisation normale</td></tr>" +
        "<tr><td>Arc jaune</td><td>De VNO à VNE : uniquement en <strong>air calme</strong>, avec prudence</td></tr>" +
        "<tr><td>Trait rouge</td><td><strong>VNE</strong> : vitesse à ne jamais dépasser</td></tr></tbody></table>" +
        "<p><strong>Altimètre</strong> : calage <strong>QNH</strong> = altitude, <strong>QFE</strong> = hauteur au-dessus du terrain, <strong>1013,25 hPa</strong> = niveau de vol. En volant vers une zone de pression plus basse sans recaler, ou par air plus froid que l’atmosphère standard, l’altimètre <strong>surestime</strong> : l’avion est <strong>plus bas</strong> qu’indiqué.</p>" +
        "<p><strong>Pannes de prises</strong> :</p>" +
        "<ul><li><strong>Pitot bouché</strong> (avec trou de purge bouché) : l’anémomètre réagit comme un altimètre : la vitesse indiquée <strong>augmente en montée</strong> et diminue en descente. Altimètre et variomètre normaux.</li>" +
        "<li><strong>Prise statique bouchée</strong> : altimètre <strong>figé</strong>, variomètre à <strong>zéro</strong>, anémomètre qui <strong>sous-estime en montée</strong> et surestime en descente.</li>" +
        "<li><strong>Prise statique de secours</strong> dans la cabine (pression légèrement plus faible) : altimètre et anémomètre indiquent <strong>un peu trop</strong>, le variomètre indique brièvement une montée.</li>" +
        "<li>Le <strong>réchauffage Pitot</strong> prévient l’obstruction par le givre.</li></ul>"
    },
    {
      h: "Instruments gyroscopiques",
      body: "<p>Un gyroscope possède la <strong>rigidité dans l’espace</strong> et subit la <strong>précession</strong>. Entraînement par <strong>dépression (venturi ou pompe à vide)</strong> ou électrique ; souvent horizon et conservateur de cap à dépression, indicateur de virage électrique (redondance).</p>" +
        "<table><thead><tr><th>Instrument</th><th>Gyroscope</th><th>Indication</th></tr></thead><tbody>" +
        "<tr><td>Horizon artificiel</td><td>Axe de rotation <strong>vertical</strong>, 2 degrés de liberté</td><td>Assiette (tangage) et inclinaison</td></tr>" +
        "<tr><td>Conservateur de cap</td><td>Axe <strong>horizontal</strong>, 2 degrés de liberté</td><td>Cap (sans erreurs de virage/accélération)</td></tr>" +
        "<tr><td>Indicateur de virage / coordinateur</td><td><strong>Gyromètre</strong>, 1 degré de liberté</td><td>Taux de virage</td></tr></tbody></table>" +
        "<ul><li>Le conservateur de cap <strong>dérive</strong> (précession, rotation terrestre) : le <strong>recaler sur le compas</strong> environ toutes les <strong>15 minutes</strong>, en vol stabilisé.</li>" +
        "<li>Virage au <strong>taux 1</strong> : <strong>3°/s</strong>, soit <strong>360° en 2 minutes</strong>.</li>" +
        "<li><strong>Bille</strong> (inclinomètre, non gyroscopique) : indique la symétrie du vol. Bille <strong>côté intérieur</strong> du virage = <strong>glissade</strong> ; bille <strong>côté extérieur</strong> = <strong>dérapage</strong>. Correction : <strong>pied du côté de la bille</strong>.</li></ul>"
    },
    {
      h: "Compas magnétique",
      body: "<ul><li><strong>Déclinaison</strong> (variation) : angle entre Nord vrai et Nord magnétique, propre au lieu, ce n’est pas une erreur de l’instrument.</li>" +
        "<li><strong>Déviation</strong> : erreur due aux champs magnétiques de l’avion ; elle est réduite par compensation et les résidus figurent sur la <strong>carte (courbe) de déviation</strong> près du compas.</li>" +
        "<li>L’<strong>inclinaison magnétique</strong> des lignes de champ provoque les erreurs de virage et d’accélération (hémisphère Nord) :</li></ul>" +
        "<table><thead><tr><th>Erreur</th><th>Effet (hémisphère Nord)</th></tr></thead><tbody>" +
        "<tr><td><strong>Accélération</strong> au cap Est ou Ouest</td><td>Indique un virage vers le <strong>Nord</strong></td></tr>" +
        "<tr><td><strong>Décélération</strong> au cap Est ou Ouest</td><td>Indique un virage vers le <strong>Sud</strong></td></tr>" +
        "<tr><td>Virage depuis le cap <strong>Nord</strong></td><td>Le compas <strong>retarde</strong> (indique d’abord un virage en sens inverse) : sortir <strong>avant</strong> le cap visé</td></tr>" +
        "<tr><td>Virage depuis le cap <strong>Sud</strong></td><td>Le compas <strong>avance</strong> : sortir <strong>après</strong> le cap visé</td></tr></tbody></table>" +
        "<p>Les erreurs d’accélération sont <strong>nulles aux caps Nord et Sud</strong> ; les erreurs de virage sont maximales aux caps Nord et Sud. Lire le compas uniquement en <strong>vol rectiligne stabilisé</strong>.</p>"
    },
    {
      h: "Navigabilité et documents de l’avion",
      body: "<table><thead><tr><th>Document</th><th>Rôle</th></tr></thead><tbody>" +
        "<tr><td><strong>Certificat d’immatriculation</strong></td><td>Nationalité et marques de l’aéronef</td></tr>" +
        "<tr><td><strong>CDN</strong> (certificat de navigabilité)</td><td>Atteste la conformité au type certifié ; reste valable tant que l’avion est entretenu et que le certificat d’examen de navigabilité est valide</td></tr>" +
        "<tr><td><strong>CEN / ARC</strong> (certificat d’examen de navigabilité)</td><td>Confirme périodiquement la navigabilité, validité <strong>1 an</strong></td></tr>" +
        "<tr><td><strong>Manuel de vol</strong> (AFM / POH)</td><td><strong>Limitations</strong>, procédures normales et d’urgence, performances, masse et centrage</td></tr>" +
        "<tr><td><strong>Carnet de route</strong></td><td>Enregistre chaque vol (date, équipage, lieux, temps de vol) et les anomalies constatées</td></tr>" +
        "<tr><td>Licence de station radio, attestation d’assurance, fiche de pesée</td><td>Autres documents exigibles</td></tr></tbody></table>" +
        "<ul><li>Les limitations du manuel de vol sont <strong>impératives</strong> ; les marques sur les instruments et les plaquettes en cabine les reprennent.</li>" +
        "<li>Le pilote vérifie avant le vol que l’avion est en état de navigabilité et que les documents sont <strong>à bord et valides</strong>.</li></ul>"
    }
  ],
  questions: [
    { t: "Structure", q: "Une structure semi-monocoque se caractérise par :", a: ["un revêtement travaillant renforcé par des cadres et des lisses", "un treillis de tubes soudés recouvert d’une toile non travaillante", "un revêtement seul, sans aucun renfort interne", "une structure en bois massif sans revêtement"], c: 0, e: "En semi-monocoque, le revêtement participe à la reprise des efforts avec des cadres et des lisses qui le raidissent. C’est la structure la plus courante." },
    { t: "Compensateur", q: "Pour compenser une gouverne de profondeur braquée vers le haut, le compensateur (tab) est braqué :", a: ["vers le haut, dans le même sens", "il reste au neutre", "vers le bas, en sens opposé", "alternativement vers le haut et vers le bas"], c: 2, e: "Le compensateur se braque en sens opposé à la gouverne : la force aérodynamique sur le tab maintient la gouverne en position et annule l’effort au manche." },
    { t: "Commandes de vol", q: "Les ailerons commandent le mouvement de l’avion autour de :", a: ["l’axe vertical (lacet)", "l’axe transversal (tangage)", "l’axe de l’hélice", "l’axe longitudinal (roulis)"], c: 3, e: "Les ailerons, braqués en sens inverse l’un de l’autre, font tourner l’avion autour de son axe longitudinal : c’est le roulis." },
    { t: "Train d’atterrissage", q: "Par rapport à un train tricycle, un train classique (roulette de queue) :", a: ["a son centre de gravité en avant des roues principales", "est plus instable en lacet au sol, avec un risque de cheval de bois", "offre une meilleure visibilité vers l’avant au roulage", "n’a pas besoin de freins"], c: 1, e: "Avec un train classique, le centre de gravité est en arrière des roues principales : tout écart de trajectoire tend à s’amplifier, d’où le risque de cheval de bois." },
    { t: "Moteur 4 temps", q: "L’ordre des temps du cycle d’un moteur à pistons à 4 temps est :", a: ["compression, admission, combustion-détente, échappement", "admission, combustion-détente, compression, échappement", "admission, échappement, compression, combustion-détente", "admission, compression, combustion-détente, échappement"], c: 3, e: "Admission, compression, combustion-détente (seul temps moteur) puis échappement, le tout sur deux tours de vilebrequin." },
    { t: "Allumage", q: "Les magnétos d’un moteur d’avion léger :", a: ["produisent leur propre courant et sont indépendantes du circuit électrique de l’avion", "sont alimentées par la batterie", "sont alimentées par l’alternateur après le démarrage", "ne fonctionnent que si le contacteur général (master) est sur ON"], c: 0, e: "Les magnétos sont des générateurs autonomes entraînés par le moteur. Une panne électrique totale n’arrête donc pas le moteur." },
    { t: "Allumage", q: "Lors de l’essai magnétos, aucune chute de régime n’est constatée en passant sur une seule magnéto. Cela peut indiquer :", a: ["un fonctionnement parfait du moteur", "une mise à la masse défectueuse de la magnéto", "un mélange trop riche", "un givrage du carburateur"], c: 1, e: "Une légère chute de régime est normale. L’absence de chute peut signifier que la magnéto « coupée » n’est pas mise à la masse : elle reste active, ce qui est dangereux au sol." },
    { t: "Givrage carburateur", q: "Le risque de givrage carburateur est le plus élevé :", a: ["par température négative et air très sec, à pleine puissance", "uniquement en vol dans les nuages par température négative", "par air humide entre environ -10 °C et +30 °C, à puissance réduite", "uniquement au-dessus de 10 000 ft"], c: 2, e: "La détente de l’air et la vaporisation de l’essence refroidissent fortement le venturi. Le risque est maximal par forte humidité, même par température positive et ciel clair, et papillon presque fermé." },
    { t: "Réchauffage carburateur", q: "Sur un avion à hélice à pas fixe sans givre présent, l’application du réchauffage carburateur provoque :", a: ["une augmentation du régime due à l’air plus chaud", "aucune variation du régime", "un appauvrissement du mélange", "une légère baisse du régime car l’air chaud, moins dense, enrichit le mélange"], c: 3, e: "L’air chaud est moins dense : la masse d’air admise diminue, le mélange s’enrichit et la puissance baisse. S’il y avait de la glace, le régime remonterait ensuite après sa fonte." },
    { t: "Mélange", q: "En montée, si le pilote ne modifie pas la commande de mélange :", a: ["le mélange s’enrichit car la densité de l’air diminue", "le mélange s’appauvrit car la densité de l’air diminue", "le mélange reste constant", "le moteur risque la détonation par mélange trop pauvre"], c: 0, e: "Le débit d’essence reste le même alors que la masse d’air admise diminue avec l’altitude : le mélange devient trop riche, il faut appauvrir." },
    { t: "Détonation", q: "Parmi ces causes, laquelle favorise la détonation ?", a: ["Un mélange trop riche", "Un carburant d’indice d’octane inférieur à celui prescrit", "L’utilisation du réchauffage carburateur", "Un régime moteur trop faible au ralenti"], c: 1, e: "Un indice d’octane trop faible, un mélange trop pauvre ou une température excessive des cylindres favorisent la détonation. Un mélange riche, au contraire, refroidit." },
    { t: "Injection", q: "Un moteur à injection, par rapport à un moteur à carburateur :", a: ["est plus sensible au givrage carburateur", "ne nécessite pas de commande de mélange", "n’est pas sujet au givrage carburateur, mais peut être difficile à redémarrer à chaud", "ne peut pas utiliser d’AVGAS 100LL"], c: 2, e: "Sans venturi ni vaporisation dans un carburateur, il n’y a pas de givrage carburateur. La vaporisation de l’essence dans les canalisations chaudes (vapor lock) peut gêner le redémarrage à chaud." },
    { t: "Carburant", q: "L’AVGAS 100LL est reconnaissable à sa couleur :", a: ["verte", "rouge", "incolore à paille", "bleue"], c: 3, e: "L’AVGAS 100LL (Low Lead) est colorée en bleu. L’AVGAS 100 est verte et le JET A-1 incolore à paille." },
    { t: "Carburant", q: "Les purges carburant se font au point bas des réservoirs car :", a: ["l’eau, plus lourde que l’essence, s’y accumule", "l’essence la plus pure s’y trouve", "les vapeurs d’essence s’y concentrent", "c’est là que se trouve la mise à l’air libre"], c: 0, e: "L’eau est plus dense que l’essence et se dépose au fond. On purge avant le premier vol et après chaque avitaillement, jusqu’à obtenir un carburant pur." },
    { t: "Lubrification", q: "Après la mise en route, la pression d’huile ne monte pas dans les secondes qui suivent. Le pilote doit :", a: ["augmenter le régime pour faire monter la pression", "couper le moteur", "décoller car la pression montera avec la température", "activer le réchauffage carburateur"], c: 1, e: "Sans pression d’huile, le moteur n’est pas lubrifié et peut être gravement endommagé en peu de temps. Il faut couper le moteur immédiatement." },
    { t: "Hélice", q: "Les pales d’une hélice sont vrillées (calage décroissant du moyeu vers l’extrémité) afin de :", a: ["réduire le bruit en bout de pale", "augmenter la vitesse de rotation", "faciliter la fabrication", "conserver une incidence à peu près constante le long de la pale"], c: 3, e: "La vitesse de rotation d’un élément de pale augmente avec le rayon. Le calage doit donc diminuer vers l’extrémité pour garder une incidence voisine sur toute la pale." },
    { t: "Hélice", q: "Sur un avion équipé d’une hélice à vitesse constante, la manette d’hélice permet de régler :", a: ["le régime (tr/min)", "la pression d’admission", "la richesse du mélange", "la température des culasses"], c: 0, e: "Le régulateur ajuste le calage pour maintenir le régime choisi par la manette d’hélice ; la manette des gaz règle la pression d’admission." },
    { t: "Circuit électrique", q: "En vol, moteur tournant, l’ampèremètre indique une décharge permanente. Cela signifie probablement :", a: ["que la batterie est pleinement chargée", "une panne d’alternateur : la batterie alimente seule les équipements", "une panne de magnéto", "un fonctionnement normal en croisière"], c: 1, e: "L’alternateur ne débite plus et la batterie se vide. Il faut délester les équipements non essentiels et envisager d’atterrir." },
    { t: "Circuit électrique", q: "Un disjoncteur a sauté en vol. La conduite à tenir est :", a: ["le maintenir enfoncé en permanence", "le réarmer autant de fois que nécessaire", "le réarmer une seule fois après quelques instants, et ne plus insister s’il saute à nouveau", "couper les magnétos"], c: 2, e: "Un disjoncteur protège contre une surintensité. S’il saute une seconde fois, un défaut persiste et le réarmer de nouveau ferait courir un risque d’incendie." },
    { t: "Anémomètre", q: "Sur l’anémomètre, l’arc vert correspond à la plage :", a: ["de VS0 à VFE", "de VNO à VNE", "de VS0 à VNE", "de VS1 à VNO"], c: 3, e: "L’arc vert va de VS1 (décrochage en configuration lisse) à VNO : c’est la plage d’utilisation normale. L’arc blanc va de VS0 à VFE et l’arc jaune de VNO à VNE." },
    { t: "Pannes de prises", q: "Le tube de Pitot et son trou de purge sont bouchés, la prise statique est libre. En montée, l’anémomètre :", a: ["indique une vitesse qui augmente", "indique une vitesse qui diminue", "reste figé sur la dernière valeur", "indique zéro"], c: 0, e: "La pression totale est piégée alors que la pression statique diminue avec l’altitude : la différence augmente et l’anémomètre réagit comme un altimètre." },
    { t: "Pannes de prises", q: "La prise statique est obstruée. Quelles indications observe-t-on ?", a: ["Altimètre et variomètre normaux, anémomètre figé", "Altimètre figé, variomètre à zéro, anémomètre faux", "Altimètre qui surestime, variomètre normal", "Seul le compas est affecté"], c: 1, e: "Altimètre et variomètre n’utilisent que la pression statique : ils restent figés (variomètre à zéro). L’anémomètre sous-estime en montée et surestime en descente." },
    { t: "Pannes de prises", q: "Après passage sur la prise statique de secours située dans la cabine, l’altimètre indique en général :", a: ["une altitude un peu inférieure à la réalité", "zéro", "une altitude un peu supérieure à la réalité", "exactement la même valeur"], c: 2, e: "La pression dans la cabine est en général légèrement inférieure à la pression statique extérieure : altimètre et anémomètre indiquent un peu trop." },
    { t: "Altimètre", q: "Un avion vole vers une zone de basse pression sans que le pilote recale l’altimètre. L’altitude réelle de l’avion est :", a: ["supérieure à l’altitude indiquée", "égale à l’altitude indiquée", "impossible à déterminer", "inférieure à l’altitude indiquée"], c: 3, e: "En maintenant une altitude indiquée constante vers une pression plus basse, l’avion descend réellement : l’altimètre surestime. « Des hautes vers les basses pressions, attention en bas. »" },
    { t: "Conservateur de cap", q: "Le conservateur de cap doit être recalé périodiquement :", a: ["sur le compas magnétique, environ toutes les 15 minutes, en vol stabilisé", "sur la route vraie lue sur la carte", "uniquement avant le décollage", "pendant les virages, pour corriger les erreurs du compas"], c: 0, e: "Le gyroscope dérive (précession, rotation terrestre). On le recale sur le compas en vol rectiligne stabilisé, là où le compas est fiable." },
    { t: "Bille", q: "En virage à gauche, la bille est déportée vers la gauche (intérieur du virage). Le vol est :", a: ["dérapé ; il faut mettre du pied à droite", "glissé ; il faut mettre du pied à gauche", "symétrique", "glissé ; il faut mettre du pied à droite"], c: 1, e: "Bille à l’intérieur du virage = glissade. On corrige en mettant du pied du côté de la bille, ici à gauche." },
    { t: "Indicateur de virage", q: "Un virage au taux 1 correspond à :", a: ["1° par seconde, 360° en 6 minutes", "une inclinaison de 15°", "3° par seconde, 360° en 2 minutes", "6° par seconde, 360° en 1 minute"], c: 2, e: "Le taux standard (taux 1) est de 3°/s, soit un tour complet en 2 minutes. L’inclinaison nécessaire dépend de la vitesse." },
    { t: "Compas magnétique", q: "Dans l’hémisphère Nord, au cap Ouest, une accélération fait indiquer au compas :", a: ["un virage vers le Nord", "un virage vers le Sud", "aucune erreur", "une oscillation sans direction préférentielle"], c: 0, e: "Aux caps Est et Ouest, une accélération fait indiquer un virage vers le Nord, une décélération un virage vers le Sud. L’erreur est nulle aux caps Nord et Sud." },
    { t: "Documents", q: "La validité du certificat d’examen de navigabilité (CEN / ARC) est de :", a: ["6 mois", "3 ans", "1 an", "illimitée"], c: 2, e: "Le CEN (ARC) confirme la navigabilité de l’avion et doit être renouvelé chaque année. Le CDN reste valable tant que le CEN est en cours de validité." },
    { t: "Documents", q: "Les limitations de vitesses, de masse et de centrage d’un avion figurent dans :", a: ["le carnet de route", "le certificat d’immatriculation", "la licence de station radio", "le manuel de vol"], c: 3, e: "Le manuel de vol (AFM / POH) contient les limitations, les procédures normales et d’urgence, les performances ainsi que la masse et le centrage." }
  ]
});
