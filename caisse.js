// =============================================
// CONFIGURATION
// =============================================
var BUSINESS_NAME = 'BregProduction';
var BUSINESS_ADDRESS = 'DELMAS 73, #30, Rue Jn Baptiste , Route de siloe (à côté du collège St Martin de Tour), Haiti';
var BUSINESS_TEL = '+509 41 62 64 70 +509 3856-0996 +509 4174-3717 +509 3651-4332 +509 3121-7587';
var PASSWORD = '1234';

// =============================================
// PRIX TABLOÏD PVC (HTG)
// =============================================
var tabloidPrix = {
  '8x10':   { '3mm': 750,   '6mm': null  },
  '10x12':  { '3mm': 1000,  '6mm': null  },
  '10x14':  { '3mm': 1250,  '6mm': null  },
  '10x16':  { '3mm': 1500,  '6mm': 1750  },
  '12x14':  { '3mm': 1750,  '6mm': 2000  },
  '12x16':  { '3mm': 1750,  '6mm': 2000  },
  '14x18':  { '3mm': 2300,  '6mm': 2500  },
  '14x20':  { '3mm': 2500,  '6mm': 2800  },
  '16x20':  { '3mm': 2800,  '6mm': 3000  },
  '18x22':  { '3mm': null,  '6mm': 4500  },
  '20x26':  { '3mm': null,  '6mm': 5500  },
  '22x26':  { '3mm': null,  '6mm': 6500  },
  '22x28':  { '3mm': null,  '6mm': 7500  },
  '24x36':  { '3mm': null,  '6mm': 8500  },
  '30x40':  { '3mm': null,  '6mm': 10000 }
};

var tabloidDimensions = ['8x10','10x12','10x14','10x16','12x14','12x16','14x18','14x20','16x20','18x22','20x26','22x26','22x28','24x36','30x40'];

// =============================================
// PRODUITS
// =============================================
var produits = [
  // Tabloïd PVC — prix dynamique, géré séparément
  { id:1,  nom:'Tabloïd PVC',           prix:750,  stock:100, options:['tabloid'],    categorie:'Tabloïd',   monnaie:'HTG' },

  // Porte clé
  { id:2,  nom:'Porte clé simple',      prix:1250,  stock:100,  options:['texte'],      categorie:'Porte clé', monnaie:'HTG' },
  { id:3,  nom:'Porte clé double face', prix:1500,  stock:50,  options:['texte'],      categorie:'Porte clé', monnaie:'HTG' },

  // Bidon non conservé
  { id:4,  nom:'Bidon 750ml',           prix:2250,  stock:20,  options:['texte'],      categorie:'Bidon',     monnaie:'HTG' },
  { id:5,  nom:'Bidon Kid',             prix:1750,  stock:20,  options:['texte'],      categorie:'Bidon',     monnaie:'HTG' },

  // Bidon conservé (Gobelet)
  { id:6,  nom:'Tumbler simple 20 Oz',  prix:2500,  stock:20,  options:['texte'],      categorie:'Gobelet',   monnaie:'HTG' },
  { id:7,  nom:'Tumbler 2 Couv 20 Oz',  prix:3000,  stock:20,  options:['texte'],      categorie:'Gobelet',   monnaie:'HTG' },
  { id:8,  nom:'Bidon 22 Oz',           prix:3500,  stock:20,  options:['texte'],      categorie:'Gobelet',   monnaie:'HTG' },
  { id:9,  nom:'Bidon enfant 12 Oz',    prix:2500,  stock:20,  options:['texte'],      categorie:'Gobelet',   monnaie:'HTG' },
  { id:10, nom:'Bidon enfant 20 Oz',    prix:3000,  stock:20,  options:['texte'],      categorie:'Gobelet',   monnaie:'HTG' },

  // Tasse
  { id:11, nom:'Tasse simple',          prix:1000,  stock:30,  options:['texte'],      categorie:'Tasse',     monnaie:'HTG' },
  { id:12, nom:'Tasse Magic',           prix:2000,  stock:30,  options:['texte'],      categorie:'Tasse',     monnaie:'HTG' },

  // Agenda
  { id:13, nom:'Calendrier',            prix:500,  stock:30,  options:['texte'],      categorie:'Agenda',    monnaie:'HTG' },
  { id:14, nom:'Cahier N&B',            prix:1500,  stock:20,  options:['texte'],      categorie:'Agenda',    monnaie:'HTG' },
  { id:15, nom:'Cahier Couleur',        prix:2000,  stock:20,  options:['texte'],      categorie:'Agenda',    monnaie:'HTG' },

  // Bijoux
  { id:16, nom:'Chaine Gravée',         prix:3000,  stock:15,  options:['texte'],      categorie:'Bijoux',    monnaie:'HTG' },
  { id:17, nom:'Bracelet Gravé',        prix:3500,  stock:15,  options:['texte'],      categorie:'Bijoux',    monnaie:'HTG' },
  { id:18, nom:'Chaîne avec photo',     prix:1500,  stock:15,  options:['texte'],      categorie:'Bijoux',    monnaie:'HTG' },

  // Bourse
  { id:19, nom:'Bourse Fille',          prix:3500,  stock:15,  options:['texte'],      categorie:'Bourse',    monnaie:'HTG' },
  { id:20, nom:'Bourse Garçon',         prix:2500,  stock:15,  options:['texte'],      categorie:'Bourse',    monnaie:'HTG' }
];

var ventes = [];
var panier = [];
var recuCounter = 1000;
var produitEnCours = null;

// =============================================
// LOGIN
// =============================================
function login() {
  localStorage.clear();
  var pw = document.getElementById('passwordInput').value;
  var err = document.getElementById('loginError');
  if (pw === PASSWORD) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    chargerLocal();
    updateDate();
    renderProduits();
    renderStock();
    renderHistorique();
  } else {
    err.style.display = 'block';
    err.textContent = 'Mot de passe incorrect !';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('loginScreen').style.display !== 'none') {
    login();
  }
});

function logout() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  document.getElementById('passwordInput').value = '';
  panier = [];
  updatePanier();
}

// =============================================
// NAVIGATION
// =============================================
function goTo(page) {
  var pages = document.querySelectorAll('.page');
  var navItems = document.querySelectorAll('.nav-item');
  var i;
  for (i = 0; i < pages.length; i++) { pages[i].classList.remove('active'); }
  for (i = 0; i < navItems.length; i++) { navItems[i].classList.remove('active'); }
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('nav-' + page).classList.add('active');
}

function updateDate() {
  var now = new Date();
  var options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.getElementById('topDate').textContent = now.toLocaleDateString('fr-FR', options);
}

// =============================================
// CAISSE — PRODUITS
// =============================================
function renderProduits() {
  var grid = document.getElementById('produitsGrid');
  var search = document.getElementById('searchProduit') ? document.getElementById('searchProduit').value.toLowerCase() : '';
  var list = [];
  var i;
  for (i = 0; i < produits.length; i++) {
    var p = produits[i];
    if (search && p.nom.toLowerCase().indexOf(search) === -1) { continue; }
    list.push(p);
  }
  var html = '';
  for (i = 0; i < list.length; i++) {
    var p = list[i];
    var outClass = p.stock <= 0 ? ' out-of-stock' : '';
    var lowBadge = (p.stock > 0 && p.stock <= 5) ? '<span class="produit-badge">Stock faible</span>' : '';
    var prixAff = p.id === 1 ? 'Voir options' : (p.monnaie + ' ' + p.prix.toLocaleString('fr'));
    html += '<div class="produit-card' + outClass + '" onclick="ouvrirOptions(' + p.id + ')">';
    html += lowBadge;
    html += '<div class="produit-cat">' + p.categorie + '</div>';
    html += '<div class="produit-name">' + p.nom + '</div>';
    html += '<div class="produit-price">' + prixAff + '</div>';
    if (p.id !== 1) { html += '<div class="produit-stock">Stock : ' + p.stock + '</div>'; }
    html += '</div>';
  }
  grid.innerHTML = html || '<div style="color:var(--text3);font-size:13px;grid-column:1/-1;text-align:center;padding:40px">Aucun produit</div>';
}

// =============================================
// MODAL OPTIONS
// =============================================
function ouvrirOptions(id) {
  var i;
  for (i = 0; i < produits.length; i++) {
    if (produits[i].id === id) { produitEnCours = produits[i]; break; }
  }
  if (!produitEnCours) { return; }

  document.getElementById('modalTitle').textContent = produitEnCours.nom;
  var body = document.getElementById('modalBody');
  var html = '';

  // Cas spécial : Tabloïd PVC
  if (produitEnCours.id === 1) {
    html += '<div class="modal-group">';
    html += '<label class="modal-label">Épaisseur</label>';
    html += '<select class="modal-select" id="opt-epaisseur" onchange="updateTabloidPrix()">';
    html += '<option value="3mm">3mm</option>';
    html += '<option value="6mm">6mm</option>';
    html += '</select></div>';

    html += '<div class="modal-group">';
    html += '<label class="modal-label">Dimension</label>';
    html += '<select class="modal-select" id="opt-dimension" onchange="updateTabloidPrix()">';
    for (i = 0; i < tabloidDimensions.length; i++) {
      html += '<option value="' + tabloidDimensions[i] + '">' + tabloidDimensions[i] + '</option>';
    }
    html += '</select></div>';

    html += '<div class="modal-group">';
    html += '<label class="modal-label">Prix calculé</label>';
    html += '<div id="tabloidPrixAff" style="font-family:Syne,sans-serif;font-size:20px;color:var(--accent);padding:10px 0">HTG 750</div>';
    html += '</div>';

  } else {
    // Options normales
    var opts = produitEnCours.options;
    for (i = 0; i < opts.length; i++) {
      var opt = opts[i];
      html += '<div class="modal-group">';
      if (opt === 'couleur') {
        html += '<label class="modal-label">Couleur</label>';
        html += '<select class="modal-select" id="opt-couleur">';
        html += '<option>Rouge</option><option>Bleu</option><option>Noir</option><option>Blanc</option><option>Vert</option><option>Rose</option><option>Jaune</option>';
        html += '</select>';
      } else if (opt === 'taille') {
        html += '<label class="modal-label">Taille</label>';
        html += '<select class="modal-select" id="opt-taille">';
        html += '<option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>';
        html += '</select>';
      } else if (opt === 'texte') {
        html += '<label class="modal-label">Texte / Nom à personnaliser</label>';
        html += '<input type="text" class="modal-input" id="opt-texte" placeholder="Ex: Jean Pierre, Bon anniversaire...">';
      } else if (opt === 'modele') {
        html += '<label class="modal-label">Modèle de téléphone</label>';
        html += '<input type="text" class="modal-input" id="opt-modele" placeholder="Ex: iPhone 14, Samsung S23...">';
      }
      html += '</div>';
    }
  }

  html += '<div class="modal-group">';
  html += '<label class="modal-label">Quantité</label>';
  html += '<input type="number" class="modal-input" id="opt-qty" value="1" min="1">';
  html += '</div>';

  body.innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');

  // Init prix tabloïd
  if (produitEnCours.id === 1) { updateTabloidPrix(); }
}

function updateTabloidPrix() {
  var ep = document.getElementById('opt-epaisseur').value;
  var dim = document.getElementById('opt-dimension').value;
  var prixEl = document.getElementById('tabloidPrixAff');
  var prix = tabloidPrix[dim] ? tabloidPrix[dim][ep] : null;
  if (prix) {
    prixEl.textContent = 'HTG ' + prix.toLocaleString('fr');
    prixEl.style.color = 'var(--accent)';
  } else {
    prixEl.textContent = 'Non disponible';
    prixEl.style.color = 'var(--red)';
  }
}

function fermerModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  produitEnCours = null;
}

function confirmerAjout() {
  if (!produitEnCours) { return; }

  var qty = parseInt(document.getElementById('opt-qty').value) || 1;
  if (qty < 1) { qty = 1; }

  var optStr = '';
  var prix = produitEnCours.prix;
  var monnaie = produitEnCours.monnaie;

  if (produitEnCours.id === 1) {
    // Tabloïd
    var ep = document.getElementById('opt-epaisseur').value;
    var dim = document.getElementById('opt-dimension').value;
    var p = tabloidPrix[dim] ? tabloidPrix[dim][ep] : null;
    if (!p) { showToast('Cette combinaison n\'est pas disponible !', true); return; }
    prix = p;
    optStr = 'Dim: ' + dim + ' | Ep: ' + ep;
  } else {
    var opts = produitEnCours.options;
    var parts = [];
    var i;
    for (i = 0; i < opts.length; i++) {
      var el = document.getElementById('opt-' + opts[i]);
      if (el && el.value) { parts.push(opts[i] + ': ' + el.value); }
    }
    optStr = parts.join(' | ');
  }

  panier.push({ id: produitEnCours.id, nom: produitEnCours.nom, prix: prix, monnaie: monnaie, options: optStr, qty: qty });

  fermerModal();
  updatePanier();
  showToast(produitEnCours.nom + ' ajouté !');
}

// =============================================
// PANIER
// =============================================
function updatePanier() {
  var container = document.getElementById('panierItems');
  var footer = document.getElementById('panierFooter');
  var i;

  if (panier.length === 0) {
    container.innerHTML = '<div class="panier-empty">&#128722; Panier vide<br>Cliquez sur un produit</div>';
    footer.style.display = 'none';
    document.getElementById('panierCount').textContent = '0 article';
    return;
  }

  var html = '';
  var count = 0;

  for (i = 0; i < panier.length; i++) {
    var item = panier[i];
    var subtotal = item.prix * item.qty;
    count += item.qty;
    html += '<div class="panier-item">';
    html += '<div class="panier-item-name">' + item.nom + '</div>';
    if (item.options) { html += '<div class="panier-item-options">' + item.options + '</div>'; }
    html += '<div class="panier-item-row">';
    html += '<span class="panier-item-price">' + item.monnaie + ' ' + subtotal.toLocaleString('fr') + '</span>';
    html += '<div class="panier-item-qty">';
    html += '<button class="qty-btn" onclick="changeQtyPanier(' + i + ', -1)">-</button>';
    html += '<span class="qty-num">' + item.qty + '</span>';
    html += '<button class="qty-btn" onclick="changeQtyPanier(' + i + ', 1)">+</button>';
    html += '<button class="remove-btn" onclick="removeFromPanier(' + i + ')">&#x2715;</button>';
    html += '</div></div></div>';
  }

  container.innerHTML = html;
  document.getElementById('panierCount').textContent = count + ' article' + (count > 1 ? 's' : '');

  // Totaux séparés par monnaie
  var totalHTG = 0;
  var totalHT = 0;
  for (i = 0; i < panier.length; i++) {
    if (panier[i].monnaie === 'HTG') { totalHTG += panier[i].prix * panier[i].qty; }
    else { totalHT += panier[i].prix * panier[i].qty; }
  }

  var totalStr = '';
  if (totalHTG > 0) { totalStr += 'HTG ' + totalHTG.toLocaleString('fr'); }
  if (totalHTG > 0 && totalHT > 0) { totalStr += ' + '; }
  if (totalHT > 0) { totalStr += 'HTG ' + totalHT.toLocaleString('fr'); }
  document.getElementById('panierTotal').textContent = totalStr;
  footer.style.display = 'block';
}

function changeQtyPanier(idx, d) {
  panier[idx].qty += d;
  if (panier[idx].qty <= 0) { panier.splice(idx, 1); }
  updatePanier();
}

function removeFromPanier(idx) {
  panier.splice(idx, 1);
  updatePanier();
}

function viderPanier() {
  panier = [];
  updatePanier();
}

// =============================================
// VENTE
// =============================================
function finaliserVente() {
  if (panier.length === 0) { showToast('Panier vide !', true); return; }

  var i;
  var totalHTG = 0;
  var totalHT = 0;
  for (i = 0; i < panier.length; i++) {
    if (panier[i].monnaie === 'HTG') { totalHTG += panier[i].prix * panier[i].qty; }
    else { totalHT += panier[i].prix * panier[i].qty; }
  }

  // Diminuer le stock
  var j;
  for (i = 0; i < panier.length; i++) {
    for (j = 0; j < produits.length; j++) {
      if (produits[j].id === panier[i].id && produits[j].id !== 1) {
        produits[j].stock -= panier[i].qty;
        if (produits[j].stock < 0) { produits[j].stock = 0; }
        break;
      }
    }
  }

  recuCounter++;
  var now = new Date();
  var vente = {
    num: recuCounter,
    date: now.toLocaleDateString('fr-FR'),
    heure: now.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }),
    items: JSON.parse(JSON.stringify(panier)),
    totalHTG: totalHTG,
    totalHT: totalHT
  };
  ventes.unshift(vente);

  afficherRecu(vente);
  panier = [];
  updatePanier();
  renderProduits();
  renderStock();
  renderHistorique();
  showToast('Vente enregistrée !');
  sauvegarderLocal();
}

// =============================================
// RECU
// =============================================
function afficherRecu(vente) {
  var html = '';
  html += '<div class="recu-logo">' + BUSINESS_NAME + '</div>';
  html += '<div class="recu-info">' + BUSINESS_ADDRESS + '<br>' + BUSINESS_TEL + '</div>';
  html += '<hr class="recu-divider">';
  html += '<div class="recu-num"><span>Reçu #' + vente.num + '</span><span>' + vente.date + ' ' + vente.heure + '</span></div>';
  html += '<hr class="recu-divider">';

  var i;
  for (i = 0; i < vente.items.length; i++) {
    var item = vente.items[i];
    html += '<div class="recu-item">';
    html += '<div class="recu-item-left">';
    html += '<div class="recu-item-name">' + item.nom + ' x' + item.qty + '</div>';
    if (item.options) { html += '<div class="recu-item-opts">' + item.options + '</div>'; }
    html += '</div>';
    html += '<div>' + item.monnaie + ' ' + (item.prix * item.qty).toLocaleString('fr') + '</div>';
    html += '</div>';
  }

  html += '<hr class="recu-divider">';
  if (vente.totalHTG > 0) {
    html += '<div class="recu-total-row"><span>Total HTG</span><span>HTG ' + vente.totalHTG.toLocaleString('fr') + '</span></div>';
  }
  if (vente.totalHT > 0) {
    html += '<div class="recu-total-row"><span>Total $Ht</span><span>$Ht ' + vente.totalHT.toLocaleString('fr') + '</span></div>';
  }
  html += '<hr class="recu-divider">';
  html += '<div class="recu-thanks">Merci pour votre confiance !<br>Revenez nous voir bientôt &#128512;</div>';
  html += '<div class="recu-btns">';
  html += '<button class="btn-print" onclick="window.print()">Imprimer</button>';
  html += '<button class="btn-close-recu" onclick="fermerRecu()">Fermer</button>';
  html += '</div>';

  document.getElementById('recuContent').innerHTML = html;
  document.getElementById('recuOverlay').classList.add('open');
}

function fermerRecu() {
  document.getElementById('recuOverlay').classList.remove('open');
}

// =============================================
// STOCK
// =============================================
function renderStock() {
  var tbody = document.getElementById('stockBody');
  var html = '';
  var i;
  for (i = 0; i < produits.length; i++) {
    var p = produits[i];
    var stockAff = p.id === 1 ? '—' : p.stock;
    var badgeClass = p.id === 1 ? 'stock-ok' : (p.stock > 10 ? 'stock-ok' : (p.stock > 0 ? 'stock-low' : 'stock-out'));
    var badgeText = p.id === 1 ? 'Illimité' : (p.stock > 10 ? 'OK' : (p.stock > 0 ? 'Faible' : 'Épuisé'));
    var prixAff = p.id === 1 ? 'Variable' : (p.monnaie + ' ' + p.prix.toLocaleString('fr'));
    html += '<tr>';
    html += '<td>' + p.nom + '</td>';
    html += '<td>' + p.categorie + '</td>';
    html += '<td>' + prixAff + '</td>';
    html += '<td>' + stockAff + '</td>';
    html += '<td><span class="stock-badge ' + badgeClass + '">' + badgeText + '</span></td>';
    html += '<td>';
    html += '<button class="action-btn" onclick="ouvrirEditStock(' + p.id + ')">Modifier</button>';
    if (p.id !== 1) { html += '<button class="action-btn del" onclick="supprimerProduit(' + p.id + ')">Suppr.</button>'; }
    html += '</td>';
    html += '</tr>';
  }
  tbody.innerHTML = html;
}

function ouvrirAddProduit() {
  document.getElementById('stockModalTitle').textContent = 'Nouveau Produit';
  document.getElementById('editId').value = '';
  document.getElementById('editNom').value = '';
  document.getElementById('editPrix').value = '';
  document.getElementById('editStock').value = '';
  document.getElementById('editOptions').value = '';
  document.getElementById('stockModalOverlay').classList.add('open');
}

function ouvrirEditStock(id) {
  var p = null;
  var i;
  for (i = 0; i < produits.length; i++) {
    if (produits[i].id === id) { p = produits[i]; break; }
  }
  if (!p) { return; }
  document.getElementById('stockModalTitle').textContent = 'Modifier : ' + p.nom;
  document.getElementById('editId').value = p.id;
  document.getElementById('editNom').value = p.nom;
  document.getElementById('editPrix').value = p.prix;
  document.getElementById('editStock').value = p.stock;
  document.getElementById('editOptions').value = p.options.join(', ');
  document.getElementById('stockModalOverlay').classList.add('open');
}

function sauvegarderProduit() {
  var id = parseInt(document.getElementById('editId').value);
  var nom = document.getElementById('editNom').value.trim();
  var prix = parseInt(document.getElementById('editPrix').value);
  var stock = parseInt(document.getElementById('editStock').value);
  var optsRaw = document.getElementById('editOptions').value;

  if (!nom || isNaN(prix) || isNaN(stock)) { showToast('Remplissez tous les champs !', true); return; }

  var opts = [];
  if (optsRaw) {
    var parts = optsRaw.split(',');
    var i;
    for (i = 0; i < parts.length; i++) {
      var o = parts[i].trim().toLowerCase();
      if (o) { opts.push(o); }
    }
  }

  if (id) {
    var j;
    for (j = 0; j < produits.length; j++) {
      if (produits[j].id === id) {
        produits[j].nom = nom;
        produits[j].prix = prix;
        produits[j].stock = stock;
        produits[j].options = opts;
        break;
      }
    }
    showToast('Produit modifié !');
  sauvegarderLocal();
  } else {
    var newId = produits.length > 0 ? produits[produits.length - 1].id + 1 : 1;
    produits.push({ id: newId, nom: nom, prix: prix, stock: stock, options: opts, categorie: 'Autre', monnaie: 'HTG' });
    showToast('Produit ajouté !');
  sauvegarderLocal();
  }

  fermerStockModal();
  renderStock();
  renderProduits();
}

function supprimerProduit(id) {
  var i;
  for (i = 0; i < produits.length; i++) {
    if (produits[i].id === id) { produits.splice(i, 1); break; }
  }
  renderStock();
  renderProduits();
  showToast('Produit supprimé !');
  sauvegarderLocal();
}

function fermerStockModal() {
  document.getElementById('stockModalOverlay').classList.remove('open');
}

// =============================================
// HISTORIQUE
// =============================================
function renderHistorique() {
  var i;
  var totalJourHTG = 0;
  var totalJourHT = 0;
  var today = new Date().toLocaleDateString('fr-FR');

  for (i = 0; i < ventes.length; i++) {
    if (ventes[i].date === today) {
      totalJourHTG += ventes[i].totalHTG || 0;
      totalJourHT += ventes[i].totalHT || 0;
    }
  }

  var totalGlobalHTG = 0;
  var totalGlobalHT = 0;
  for (i = 0; i < ventes.length; i++) {
    totalGlobalHTG += ventes[i].totalHTG || 0;
    totalGlobalHT += ventes[i].totalHT || 0;
  }

  document.getElementById('statVentes').textContent = ventes.length;

  var jourStr = '';
  if (totalJourHTG > 0) { jourStr += 'HTG ' + totalJourHTG.toLocaleString('fr'); }
  if (totalJourHTG > 0 && totalJourHT > 0) { jourStr += ' + '; }
  if (totalJourHT > 0) { jourStr += 'HTG ' + totalJourHT.toLocaleString('fr'); }
  document.getElementById('statJour').textContent = jourStr || '0';

  var totalStr = '';
  if (totalGlobalHTG > 0) { totalStr += 'HTG ' + totalGlobalHTG.toLocaleString('fr'); }
  if (totalGlobalHTG > 0 && totalGlobalHT > 0) { totalStr += ' + '; }
  if (totalGlobalHT > 0) { totalStr += 'HTG ' + totalGlobalHT.toLocaleString('fr'); }
  document.getElementById('statTotal').textContent = totalStr || '0';

  var tbody = document.getElementById('histoBody');
  if (ventes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text3);padding:40px">Aucune vente enregistrée</td></tr>';
    return;
  }

  var html = '';
  for (i = 0; i < ventes.length; i++) {
    var v = ventes[i];
    var nbArticles = 0;
    var j;
    for (j = 0; j < v.items.length; j++) { nbArticles += v.items[j].qty; }
    var totalAff = '';
    if (v.totalHTG > 0) { totalAff += 'HTG ' + v.totalHTG.toLocaleString('fr'); }
    if (v.totalHTG > 0 && v.totalHT > 0) { totalAff += ' + '; }
    if (v.totalHT > 0) { totalAff += 'HTG ' + v.totalHT.toLocaleString('fr'); }
    html += '<tr>';
    html += '<td>#' + v.num + '</td>';
    html += '<td>' + v.date + '</td>';
    html += '<td>' + v.heure + '</td>';
    html += '<td>' + nbArticles + ' art.</td>';
    html += '<td>' + totalAff + '</td>';
    html += '<td><button class="btn-recu" onclick="afficherRecu(ventes[' + i + '])">Reçu</button></td>';
    html += '</tr>';
  }
  tbody.innerHTML = html;
}

// =============================================
// TOAST
// =============================================
function showToast(msg, isError) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

// =============================================
// SEARCH
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  var searchEl = document.getElementById('searchProduit');
  if (searchEl) {
    searchEl.addEventListener('input', function() { renderProduits(); });
  }
});

// =============================================
// SAUVEGARDE LOCALE (localStorage)
// =============================================
function sauvegarderLocal() {
  try {
    localStorage.setItem('caisse_ventes', JSON.stringify(ventes));
    localStorage.setItem('caisse_produits', JSON.stringify(produits));
    localStorage.setItem('caisse_counter', recuCounter);
  } catch(e) {
    showToast('Erreur sauvegarde locale !', true);
  }
}

function chargerLocal() {
  try {
    var v = localStorage.getItem('caisse_ventes');
    var p = localStorage.getItem('caisse_produits');
    var c = localStorage.getItem('caisse_counter');
    if (v) { ventes = JSON.parse(v); }
    if (p) { produits = JSON.parse(p); }
    if (c) { recuCounter = parseInt(c); }
  } catch(e) {
    showToast('Erreur chargement local !', true);
  }
}

// =============================================
// EXPORT JSON
// =============================================
function exporterJSON() {
  var data = {
    ventes: ventes,
    produits: produits,
    recuCounter: recuCounter,
    exportDate: new Date().toLocaleDateString('fr-FR'),
    exportHeure: new Date().toLocaleTimeString('fr-FR')
  };
  var json = JSON.stringify(data, null, 2);
  var blob = new Blob([json], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'caisse-backup-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Backup exporté !');
}

// =============================================
// IMPORT JSON
// =============================================
function importerJSON() {
  document.getElementById('importFile').click();
}

function lireImport(event) {
  var file = event.target.files[0];
  if (!file) { return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (data.ventes) { ventes = data.ventes; }
      if (data.produits) { produits = data.produits; }
      if (data.recuCounter) { recuCounter = data.recuCounter; }
      sauvegarderLocal();
      renderProduits();
      renderStock();
      renderHistorique();
      showToast('Backup importé avec succès !');
    } catch(err) {
      showToast('Fichier invalide !', true);
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}
