import { foodItems } from "#utils/shop/food.js";
import { medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";
import { ApplicationCommandOptionType, Locale } from "discord.js";

const medicineChoices = medicineItems.map((item) => ({
	name: `${item.itemName} - Price: $${item.price}, Health: ${item.healthBenefit}`,
	value: item.itemName
}));

const foodChoices = foodItems.map((item) => ({
	name: `${item.itemName} - Price: $${item.price}, Health: ${item.healthBenefit}, Hunger: ${item.hungerBenefit}`,
	value: item.itemName
}));

const toyChoices = toyItems.map((item) => ({
	name: `${item.itemName} - Price: $${item.price}`,
	value: item.itemName
}));

export const PetCommand = {
	name: "pet",
	description: "Manage your virtual pet",
  description_localizations: {
    fr: "Gérer votre animal de compagnie virtuel",
    ja: "仮想ペットを管理する",
    [Locale.SpanishLATAM]: "Gestiona a tu mascota virtual"
  },
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "adopt",
			description: "Adopt a new pet",
      description_localizations: {
        fr: "Adopter un nouvel animal de compagnie",
        ja: "新しいペットを養子にする",
        [Locale.SpanishLATAM]: "Adopta una nueva mascota",
      },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "petname",
					description: "The name of your pet",
					description_localizations: {
						fr: "Le nom de votre animal de compagnie",
						ja: "ペットの名前",
						[Locale.SpanishLATAM]: "Nombre de tu mascota",
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "pettype",
					description: "The type of pet",
          description_localizations: {
            fr: "Le type d'animal de compagnie",
            ja: "ペットの種類",
            [Locale.SpanishLATAM]: "Tipo de mascota",
          },
					required: true,
					choices: [
						{ name: "Dog", name_localizations: { fr: "Chien", ja: "犬", [Locale.SpanishLATAM]: "Perro" }, value: "🐕 Dog" },
						{ name: "Cat", name_localizations: { fr: "Chat", ja: "猫", [Locale.SpanishLATAM]: "Gato" }, value: "🐈 Cat" },
						{ name: "Rabbit", name_localizations: { fr: "Lapin", ja: "ウサギ", [Locale.SpanishLATAM]: "Conejo" }, value: "🐇 Rabbit" },
						{ name: "Bird", name_localizations: { fr: "Oiseau", ja: "鳥", [Locale.SpanishLATAM]: "Ave" }, value: "🐦 Bird" },
						{ name: "Fish", name_localizations: { fr: "Poisson", ja: "魚", [Locale.SpanishLATAM]: "Pez" }, value: "🐠 Fish" },
						{ name: "Hamster", name_localizations: { fr: "Hamster", ja: "ハムスター", [Locale.SpanishLATAM]: "Hamster" }, value: "🐹 Hamster" },
						{ name: "Turtle", name_localizations: { fr: "Tortue", ja: "カメ", [Locale.SpanishLATAM]: "Tortuga" }, value: "🐢 Turtle" },
						{ name: "Guinea Pig", name_localizations: { fr: "Cochon d'Inde", ja: "モルモット", [Locale.SpanishLATAM]: "Cobayo" }, value: "🐹 Guinea Pig" },
						{ name: "Lizard", name_localizations: { fr: "Lézard", ja: "トカゲ", [Locale.SpanishLATAM]: "Lagartija" }, value: "🦎 Lizard" },
						{ name: "Snake", name_localizations: { fr: "Serpent", ja: "蛇", [Locale.SpanishLATAM]: "Serpiente" }, value: "🐍 Snake" },
						{ name: "Frog", name_localizations: { fr: "Grenouille", ja: "カエル", [Locale.SpanishLATAM]: "Rana" }, value: "🐸 Frog" },
						{ name: "Parrot", name_localizations: { fr: "Perroquet", ja: "オウム", [Locale.SpanishLATAM]: "Loro" }, value: "🦜 Parrot" },
						{ name: "Ferret", name_localizations: { fr: "Furet", ja: "フェレット", [Locale.SpanishLATAM]: "Hurón" }, value: "🦨 Ferret" },
						{ name: "Hedgehog", name_localizations: { fr: "Hérisson", ja: "ハリネズミ", [Locale.SpanishLATAM]: "Erizo" }, value: "🦔 Hedgehog" },
						{ name: "Chinchilla", name_localizations: { fr: "Chinchilla", ja: "チンチラ", [Locale.SpanishLATAM]: "Chinchilla" }, value: "🐹 Chinchilla" }
					]
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする", [Locale.SpanishLATAM]: "Oculta la respuesta del comando" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "feed",
			description: "Feed your pet",
			description_localizations: { fr: "Nourrir votre animal de compagnie", ja: "ペットに餌をあげる", [Locale.SpanishLATAM]: "Alimenta a tu mascota" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item",
					description_localizations: { fr: "Le nom de l'article", ja: "アイテムの名前", [Locale.SpanishLATAM]: "Nombre del artículo" },
					required: true,
					autocomplete: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする", [Locale.SpanishLATAM]: "Ocultar el resultado del comando" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "play",
			description: "Play with your pet",
			description_localizations: { fr: "Jouer avec votre animal de compagnie", ja: "ペットと遊ぶ", [Locale.SpanishLATAM]: "Jugar con tu mascota" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item",
					description_localizations: { fr: "Le nom de l'article", ja: "アイテムの名前", [Locale.SpanishLATAM]: "Nombre del artículo" },
					autocomplete: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする", [Locale.SpanishLATAM]: "Ocultar el resultado del comando" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "status",
			description: "Check the status of your pet",
      description_localizations: {
        fr: "Vérifiez l'état de votre animal de compagnie",
        ja: "ペットの状態を確認する",
        [Locale.SpanishLATAM]: "Chequear el estado de tu mascota"
      },
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする", [Locale.SpanishLATAM]: "Ocultar el resultado del comando" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "care",
			description: "Take care of your pet",
      description_localizations: {
        fr: "Prenez soin de votre animal de compagnie",
        ja: "ペットの世話をする",
        [Locale.SpanishLATAM]: "Atender a tu mascota"
      },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item used",
          description_localizations: {
            fr: "Le nom de l'article utilisé",
            ja: "使用するアイテムの名前",
            [Locale.SpanishLATAM]: "Nombre del artículo utilizado"
          },
					required: false,
					autocomplete: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする", [Locale.SpanishLATAM]: "Ocultar el resultado del comando" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.SubcommandGroup,
			name: "buy",
			description: "Buy an item from the shop",
      description_localizations: {
        fr: "Acheter un article dans la boutique",
        ja: "ショップからアイテムを購入する",
        [Locale.SpanishLATAM]: "Comprar un artículo en la tienda"
      },
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "food",
					description: "Buy food items",
          description_localizations: {
            fr: "Acheter des articles alimentaires",
            ja: "食品を購入する",
            [Locale.SpanishLATAM]: "Comprar alimentos"
          },
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							description_localizations: { fr: "Le nom de l'article", ja: "アイテムの名前", [Locale.SpanishLATAM]: "Nombre del artículo" },
							required: true,
							choices: foodChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							description_localizations: { fr: "La quantité de l'article", ja: "アイテムの数量", [Locale.SpanishLATAM]: "Cantidad del artículo" },
							required: true
						},
						{
							type: ApplicationCommandOptionType.Boolean,
							name: "hide",
							name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
							description: "Hides the output",
							description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする", [Locale.SpanishLATAM]: "Ocultar el resultado del comando" }
						}
					]
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "toy",
					description: "Buy toy items",
					description_localizations: {
						fr: "Acheter des jouets",
            ja: "おもちゃを買う",
            [Locale.SpanishLATAM]: "Comprar juguetes",
					},
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							description_localizations: {
								fr: "Le nom de l'article",
                ja: "アイテムの名前",
                [Locale.SpanishLATAM]: "Nombre del artículo",
							},
							required: true,
							choices: toyChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							description_localizations: {
								fr: "La quantité de l'article",
                ja: "アイテムの数量",
                [Locale.SpanishLATAM]: "Cantidad del artículo",
							},
							required: true
						},
						{
							type: ApplicationCommandOptionType.Boolean,
							name: "hide",
							name_localizations: {
								fr: "masquer",
                ja: "非表示",
                [Locale.SpanishLATAM]: "ocultar",
							},
							description: "Hides the output",
							description_localizations: {
								fr: "Masque(cacher) le résultat",
								ja: "出力を非表示にする",
                [Locale.SpanishLATAM]: "Ocultar el resultado del comando",
							}
						}
					]
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "medicine",
					description: "Buy medicine items",
					description_localizations: {
						fr: "Acheter des médicaments",
            ja: "薬を買う",
            [Locale.SpanishLATAM]: "Comprar medicamentos",
					},
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							description_localizations: {
								fr: "Le nom de l'article",
								ja: "アイテムの名前",
                [Locale.SpanishLATAM]: "Nombre del artículo",
							},
							required: true,
							choices: medicineChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							description_localizations: {
								fr: "La quantité de l'article",
                ja: "アイテムの数量",
                [Locale.SpanishLATAM]: "Cantidad del artículo",
							},
							required: true
						},
						{
							type: ApplicationCommandOptionType.Boolean,
							name: "hide",
							name_localizations: {
								fr: "masquer",
                ja: "非表示",
                [Locale.SpanishLATAM]: "ocultar",
							},
							description: "Hides the output",
							description_localizations: {
								fr: "Masque(cacher) le résultat",
								ja: "出力を非表示にする",
                [Locale.SpanishLATAM]: "Ocultar el resultado del comando",
							}
						}
					]
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "train",
			description: "Train your pet",
			description_localizations: {
				fr: "Entraîner votre animal de compagnie",
        ja: "ペットを訓練する",
				[Locale.SpanishLATAM]: "Entrenar mascota"
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "skill",
					description: "The skill to train your pet",
					description_localizations: {
						fr: "La compétence à entraîner",
            ja: "ペットを訓練するスキル",
						[Locale.SpanishLATAM]: "Habilidad a entrenar",
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer",
            ja: "非表示",
						[Locale.SpanishLATAM]: "ocultar",
					},
					description: "Hides the output",
					description_localizations: {
						fr: "Masque(cacher) le résultat",
						ja: "出力を非表示にする",
						[Locale.SpanishLATAM]: "Ocultar el resultado del comando",
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "battle",
			description: "Battle with another pet",
			description_localizations: {
				fr: "Combattre avec un autre animal de compagnie",
        ja: "他のペットと戦う",
				[Locale.SpanishLATAM]: "Batalla contra otra mascota",
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "opponent",
					description: "The ID of the opponent",
					description_localizations: {
						fr: "L'ID de l'adversaire",
            ja: "対戦相手のID",
						[Locale.SpanishLATAM]: "ID del oponente",
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer",
            ja: "非表示",
						[Locale.SpanishLATAM]: "ocultar",
					},
					description: "Hides the output",
					description_localizations: {
						fr: "Masque(cacher) le résultat",
						ja: "出力を非表示にする",
						[Locale.SpanishLATAM]: "Ocultar el resultado del comando",
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "quest",
			description: "Start a quest",
			description_localizations: {
				fr: "Commencer une quête",
        ja: "クエストを開始する",
				[Locale.SpanishLATAM]: "Comenzar una misión",
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "new",
					description: "Is it a new quest?",
					description_localizations: {
						fr: "Est-ce une nouvelle quête?",
            ja: "新しいクエストですか？",
						[Locale.SpanishLATAM]: "¿Es una nueva misión?"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "questname",
					description: "The name of the quest",
					description_localizations: {
						fr: "Le nom de la quête",
            ja: "クエストの名前",
						[Locale.SpanishLATAM]: "Nombre de la misión",
					},
					required: true,
					autocomplete: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer",
            ja: "非表示",
						[Locale.SpanishLATAM]: "ocultar",
					},
					description: "Hides the output",
					description_localizations: {
						fr: "Masque(cacher) le résultat",
            ja: "出力を非表示にする",
						[Locale.SpanishLATAM]: "Ocultar el resultado del comando",
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "daily",
			description: "Get 50 coins! (available each 24h)",
			description_localizations: {
				fr: "Obtenez 50 pièces! (disponible toutes les 24h)",
        ja: "50コインを獲得！ (24時間ごとに利用可能)",
				[Locale.SpanishLATAM]: "¡Obtuviste 50 monedas! (Disponible cada 24 horas)"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer",
            ja: "非表示",
						[Locale.SpanishLATAM]: "ocultar"
					},
					description: "Hides the output",
					description_localizations: {
						fr: "Masque(cacher) le résultat",
            ja: "出力を非表示にする",
						[Locale.SpanishLATAM]: "Ocultar el resultado del comando",
					}
				}
			]
		}
	],
	default_member_permissions: "0"
} as const;
