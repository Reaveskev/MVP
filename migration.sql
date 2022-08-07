DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS lifts CASCADE;
DROP TABLE IF EXISTS workouts ;


CREATE TABLE users (
    user_id SERIAL,
    username TEXT PRIMARY KEY,
    name TEXT,
    weight TEXT,
    sex TEXT,
    age INTEGER
);

CREATE TABLE lifts(
    lift_id SERIAL,
    name TEXT PRIMARY KEY,
    muscle_group TEXT,
    example VARCHAR(327),
    tips TEXT
);

CREATE TABLE workouts (
    workout_id SERIAL,
    name TEXT REFERENCES lifts(name) ON DELETE CASCADE,
    weight TEXT,
    sets INTEGER,
    reps INTEGER,
    username TEXT REFERENCES users(username)
    ON DELETE CASCADE
);


INSERT INTO users(username, name, weight, sex, age) VALUES ('CBum', 'Chris', '265 lbs', 'Male', 27),
('Kev', 'Kevin', '210 lbs', 'Male', 25),
('Kat', 'Katrina', '136 lbs', 'Female', 25);

-- psql -f migration.sql MVP


INSERT INTO lifts(name,muscle_group,example,tips) VALUES
 ('Arnold Press','Arms','https://dl.airtable.com/FvaObZ1SyqwBU12Wx4K7_giphy-2.gif','')
,('Bench', 'Chest','https://hips.hearstapps.com/ame-prod-menshealth-assets.s3.amazonaws.com/main/assets/bench-press.gif?resize=768:*','Although this is a chest exercise, your upper back and lat muscles also play a role in this pushing exercise. They act to stabilize the resistance against your body, especially at the bottom of the repetition.')
,('Bicep Curl','Arms','https://dl.airtable.com/Pld28NJDTyeYLcaJV7hQ_3e8b7121-738e-4457-b6d8-fd3a3e04de5a.gif','Don''t use momentum. Make sure the movement is coming from the bottom half of your arm not your shoulder moving the weight.')
,('Bicycle Crunch','Core','https://dl.airtable.com/Y0JUbM2YTfe8uRz0jb5w_200.gif','The lower the "straight" leg is to the ground the more challenging this exercise is.')
,('Bounds','Full Body,Legs','https://dl.airtable.com/EkEnZqmyR9aAqElh54PL_1ea07303-2e87-4876-8e68-8944edd42173.gif','Do laps across the room of these.')
,('Box Jumps','Full Body','https://dl.airtable.com/ZA0AU7h5RGyzcOQ1km9Z_giphy.gif','Don''t be afraid, you can jump higher than you think. Just try it once.')
,('Box Toe Touch','Legs','https://dl.airtable.com/ypibIv5pTmgfMNAJgY6J_workoutanniversarygif9570.gif','')
,('Broad Jump','Legs','https://dl.airtable.com/bYHQDYRDSeyzMCrhFxoT_Broad-Jumps-180-Degree-Twist.gif','You can do these for speed, or for distance. Speed = Cardio, Distance/Height = Plyo')
,('Bulgarian Split Squat','Legs','https://dl.airtable.com/599OAXT5SmTKCEZDTkWA_erin_stern_demonstrates_bulgarian_split_squat.gif','Use Single 30LB Dumbbell or an Olympic Bar')
,('Burpee','Full Body','https://dl.airtable.com/xDZ3bhDQqG3erLNNwgyF_Burpee.gif','Option with half Bosu, Pushup Optional. Make sure you don''t round your back')
,('Burpee Broad Jump','Full Body','https://dl.airtable.com/e4ymuWNQqezi70M2EVpG_BurpeeBroadJump-1.gif','Do laps of these across the room if you have the space.')
,('Butt Kickers','Legs','https://dl.airtable.com/pUgsc0ifRCKNfXOcvkSX_1ef0b377-0b2e-47a0-9f1f-1e8ab3669923.gif','Do it like you mean it, or this exercise is a waste of time.')
,('Calf Raise','Legs','https://dl.airtable.com/SQxbpgUWQSGxagLa6JaD_Calf-Raises-Basic.jpg','Play around with foot placement, some gyms also have machines for this')
,('Chest Press','Arms','https://dl.airtable.com/kyVvuwERkueuJQpV5fcT_Dumbbell-Floor-Press.gif','You can do this lying on the ground, or on a bench top')
,('Close to Wide Grip Burnout','Arms','https://dl.airtable.com/EKGDlplSbeSlC8mY2jqH_4.gif','')
,('Compass Jump','Full Body','https://dl.airtable.com/DVWMKACWQ2S1D1AIo75L_3b38ff89-fc79-409e-b45e-ae6a47d1ca17.gif','These can also be done with both feet on the ground.')
,('Crab Crawl','Full Body','https://dl.airtable.com/ATjCdKZ9QialuVzd072J_0d08fe37-5714-486b-a786-fea0f0cfbea7.gif','')
,('Curtsey Lunges','Legs','https://dl.airtable.com/qInmxz6RmTISdbvfQxUQ_curtsy_lunge_barbell.gif','')
,('Deadlift','Posterior Chain','https://media2.giphy.com/media/26BRHJV6j9HjNQRws/giphy.gif?cid=790b761178521a6a88bed7cca698a594a8dd0cb77044fed9&rid=giphy.gif&ct=g','')
,('Deficit Squat','Legs','https://dl.airtable.com/Je3QynAQXy8fNetseCA8_dumbell-squat-from-deficit-front-view.png','')
,('Donkey Kick','Legs','https://dl.airtable.com/I8w2TckURdenkD5E9hXl__KneelingGluteKickBackSelf2_1_10.gif','')
,('Fire Hydrant','Legs','https://dl.airtable.com/MEMCDbjRam2VygRIDV5S_Jen-Selters-Fire-Hydrant.gif','')
,('Flutter Kick','Core','https://dl.airtable.com/rsRW7e2JQMSscISPxOwm_Flutter-Kicks.gif','Her neck looks like its undergoing some serious strain. Feel free to leave yours on the ground.')
,('Frogger','Full Body','https://dl.airtable.com/LqlhafK8SdbDLhssMfVG_831b594cc2767b2f_Frogger.gif','')
,('Glute Bridge','Legs','https://dl.airtable.com/KNCrgmAZTKyppbcj7oTC_a562d6f5-888c-4b4a-a274-f969c3a8557d.gif','If using weights, place in hip crease')
,('Glute Bridge March','Legs','https://dl.airtable.com/CEVQMLbKSouX9GjRVXpR_7346ca6c-b218-4a33-8fc7-f522df243390.gif','')
,('Goblet Squat','Legs','https://dl.airtable.com/GhZXa41TlGnE4DjPPmWA_depositphotos_127641230-stock-photo-kettlebell-goblet-squat.jpg','')
,('Halo','Arms','https://dl.airtable.com/XfsU9SRQoqRDq99IUeA2_ebe25b12-cc24-4b29-8d98-9566007ac4a8.gif','')
,('Heart Pump','Arms','https://dl.airtable.com/rTMlSufGTWmbykC4De4Y_eac68ec3-15dc-4a6a-806f-aa7572f394b0.gif','')
,('High Knees','Full Body','https://dl.airtable.com/J9KgeDiSS6CcpoXXCu6v_highkneerun-1457044203.gif','My coach always says, your high knees tells a lot about your dedication. Do yours like the guy in the gif. Get your knees up or don''t bother!')
,('Jump Lunges','Legs','https://dl.airtable.com/Ba9XRSpLRIK2a7mnAcxp_6405bfbb-585f-45e8-8834-0c5145f546f6.gif','')
,('Jump Rope','Full Body','https://dl.airtable.com/vMYowb6TRJ6PeXp23MvX_Sprint-2.gif','')
,('Jumping Jack Push Press','Full Body','https://dl.airtable.com/oZVQcwVARtqxWSC7tyFu_workoutanniversarygif05570.gif','')
,('Jumping Jacks','Full Body','https://dl.airtable.com/4EdvWh9Tre1EKZ9BH9LA_jumping-jacks-gif-11.gif','Go faster than the gif lady. I chose her because she has good form, your hand should always touch at the top')
,('Kettlebell Swing','Full Body','https://dl.airtable.com/sc9eLj4NTPSdXpxAlVxv_778789f4361994739ce59b8e597d00e7.gif','When I do these I usually keep my hand close to my body and let my hips "push" the movement. If you''d like to experiment, you can use a dumbbell instead')
,('Knee Drive','Full Body','https://dl.airtable.com/zk1x1ZczQLaNOaduvTiF_skipsgifsmall.gif','')
,('Lateral Band Walk','Legs','https://dl.airtable.com/CF41gTm6RqG9eXo4ZZn1__CrabWalkSelf2_1_2.gif','')
,('Leg Pull Apart','Legs,Back','https://dl.airtable.com/5BX9RPuRQsanTolgDYcg_f240c036-c8d8-4d59-8a2b-941a438ea462.gif','')
,('Leg Raise','Core','https://dl.airtable.com/dXQ5blUQzqkbvODop0DP_legraise.jpg','Hold onto something heavy')
,('Literally Just Jumping','Full Body','https://dl.airtable.com/vlcOBT7rRZKO6CPNG3bP_tenor.gif','No good gifs for this, keep core tight, minimize time on the ground and jump up and down.')
,('Lying Leg Raises','Core','https://dl.airtable.com/poLyFerTtuakObeRkXam_lying.gif','')
,('Military Plank','Full Body,Arms','https://dl.airtable.com/jKY8uPBNQCmUoiT9oehg_Military-Plank-Vicky.gif','')
,('Monkey Jump','Full Body','https://dl.airtable.com/niCgrY1wSI2BNzhk9Yuc_d6367f97-0584-4895-b292-d7aeae1b3ad6.gif','')
,('Mountain Climbers','Core,Full Body','https://dl.airtable.com/irHgy8wcTOaOoGUxhSxa_mountain-climbers-gif-3.gif','')
,('Plank','Full Body,Core','https://dl.airtable.com/oAufzPV5TLaAWqvawz9T_plank.jpg','')
,('Plank Jack','Full Body,Core','https://dl.airtable.com/gQzMkwbOSdab50QPoMEB_3705bd36-6b31-42df-9dd1-8d4984b797dc.gif','')
,('Plank Row','Full Body,Back','https://dl.airtable.com/grctQ485ReSm2OEthRIc_3d9683d8b8f09bb0863726633ae69910.gif','')
,('Pushup','Arms','https://dl.airtable.com/yyFWkXdGT2i7TMjYZGpL_GlossySkinnyDuckbillcat-max-1mb.gif','Can be done from knees, or legs. Arms parallel to your body like the dude in the gif.')
,('Pushup Walk','Arms','https://dl.airtable.com/qK68xf5EQhiJvcxDH3Pd_094028d3-bc38-481b-85c1-5c8dad17f12b.gif','')
,('Reverse Crunches','Core','https://dl.airtable.com/VaOguQgQI6w8qryauNZQ_reverse.gif','')
,('Row','Back','https://dl.airtable.com/kVcbXQy9QdGOrjdFdzoO_78eb6279-95b9-4269-a337-c2c0ca3b78d3.gif','Bar + 15LB')
,('Russian Twist','Core','https://dl.airtable.com/dYG39TGTPavUaPz63Jsy_26c0501d-0254-4bc7-9b79-47b004393d4d.gif','')
,('Seal Jacks','Full Body','https://dl.airtable.com/IFXO2u2ZR8OzAHgp52v1_Seal-Jacks.gif','Clap your hands and dance around while you do these. Makes life more fun.')
,('Shoulder Press','Arms','https://dl.airtable.com/lk4lhOS9RdqnKm5Pj7aw_03478637-60f5-49f1-95b3-593fead73610.gif','Bar + 5LB')
,('Side Arm / Lateral Raise','Arms','https://dl.airtable.com/NUbYbi5uRb6GeH0ZlcXi_12abf096-2edb-4062-8468-17e2951c14fe.gif','')
,('Side Lunge','Legs','https://dl.airtable.com/OL3jchvCRQSLsnYmhI55_lungeside.gif','')
,('Side Plank','Full Body,Core','https://dl.airtable.com/keRG2g3RECoT3LxhDGtQ__main2_sideplank.jpg','')
,('Side Plank Dips','Core','https://dl.airtable.com/wkTRLvHTt2o4UX8RLo61_Side-Plank-Hip-Dips.gif','')
,('Side Plank with Leg Lift','Core','https://dl.airtable.com/llvinxQRxCzG0K0YihOQ_75dcba8e-f0af-48c0-a6e8-c477b738911e.gif','')
,('Single Arm Clean and Press','Full Body,Arms','https://dl.airtable.com/M3Q7JQh4SEC22nZq5ru0_KettleBellCleanPress.gif','Currently using 25LB')
,('Single Leg Hip Bridge','Legs','https://dl.airtable.com/nNGVnc7SFewVtiVcQb3U_Hip-Thrust.gif','You''re wasting your time on this if you''re not actually thinking about squeezing your glutes with each movement. You really need to be focused to do this.')
,('Single Leg Squat','Legs','https://dl.airtable.com/PtJIrGJjSkqqfObx7q8c_c7c4a48e-8a32-4f5e-aacf-bf152712e71a.gif','')
,('Situp and Throw','Core','https://dl.airtable.com/NDsSU55jRXSUAdKHEZA3_30-best-ab-exercises-situp-and-throw.jpg','')
,('Skaters','Legs','https://dl.airtable.com/Q5dmhk82TzqmlWq6xqJg_cca03f06-da6a-4d09-9718-b6e595fb2b96.gif','Lady in the gif isn''t giving it 100% make sure to touch the ground between reps')
,('Skipping','Full Body','https://dl.airtable.com/k5H1cu0cQF6rfO8LsRaa_4ee3d030-05d7-4961-86a6-bcdc727ec8e9.gif','')
,('Skull Crusher','Arms','https://dl.airtable.com/h9v6LLAERqunzBJAdjeD_14.gif','')
,('Spiderman Pushup','Arms,Core','https://dl.airtable.com/OK93O1xWRA2yu3GG8zoF_0dd5e852-dd90-4f1e-a570-c20dca7c72cf.gif','')
,('Squat','Legs','https://dl.airtable.com/r3DIlCSPTsimSjgCPuHS_barbell-squat.gif','Set the hips back without bending over.')
,('Squat Jump','Legs','https://dl.airtable.com/gpp3YS4jTyijTClCALdq_5a1e902f-42e7-4b38-b3c5-af3cb2cbbf0c.gif','You can do these for height (plyo) or speed (cardio) and to switch them up sometimes do them with your arms clasped at the front so it''s a leg-only exercise')
,('Squat Jumps 180','Full Body','https://dl.airtable.com/U5DO3G2T1apEtdTbx9PH_0145ce919124c8a3_SquatJump180Small.gif','Turn body 180 while doing squat jump')
,('Squat to Lateral Leg Lift','Legs','https://dl.airtable.com/ZuOXOtbTRcuVbC9uQPuY__SquatLateralLegLiftSelf2_1_3.gif','')
,('Standing Glute Kickbaks','Legs','https://dl.airtable.com/uF03I0P8SQW3vLXFUfRN__StandingGluteKickBackSelf2_1_4.gif','')
,('Standing Leg Lift','Legs','https://dl.airtable.com/5som2SlmRjmkjITXHWtQ_standing%20abduction.jpg','')
,('Standing Oblique Crunch','Core','https://dl.airtable.com/38n4dcbTgCM2tjvxWKUb_Standing-Oblique-Crunches.gif','20LB Weight Minimum')
,('Star Jump','Full Body','https://dl.airtable.com/ISLRenRs2FWV3QFratPw_workoutanniversarygif06570.gif','')
,('Step Up Lunges','Legs','https://dl.airtable.com/QBmW9FpxQn2FN7CQLFH7_dumbbell-step-up.gif','')
,('Step-Back Lunge','Legs','https://dl.airtable.com/A2uJ0HlJQWWebQFz0eul_bikini_prep_full_glute_training_routine_quest_cake_recipe_training_vlog.gif','')
,('Straightup Situp','Core','https://dl.airtable.com/GPXUq5zcRoGqP9WbvJLa_30-best-ab-exercises-straight-leg-barbell-situp.jpg','')
,('Sumo Squat','Legs','https://dl.airtable.com/OLsqAqSuS16qsySMCgAw_a7a48b0ff2d2b6b10e086290b1fede92.gif','Bar + 35LB. You want your legs to be just wide enough that your knees still track over your toes')
,('Superman','Back','https://dl.airtable.com/I7Gp5cmZTKejJcfh2oNA_13a573f1_Superman.jpg','')
,('Touchdown','Full Body','https://dl.airtable.com/MTMz4OoeRFaccThM3XKx_WtFJBce.gif','')
,('Tricep Dip','Arms','https://dl.airtable.com/gZTLGaYoTI6P0WwdO2u4_Tricep-Dip-on-Bench-g.gif','Find a chair or platform you can lean on.')
,('Tricep Kick-Back','Arms','https://dl.airtable.com/tjY0kN2QTBSIoZZCv10k_Triceps-Kickback.jpg','')
,('Tricep Overhead Press','Arms','https://dl.airtable.com/Pp7ftUMQe6qzCxJg7iXs_5.gif','')
,('Tuck Jump','Full Body','https://dl.airtable.com/Zo0O59geRTataUwhQo2r_Tuck-Jumps.gif','')
,('Twisted Mountain Climbers','Full Body,Core','https://dl.airtable.com/QqbBRbLRFaMBuFe9VR8g_mountain-climbers-gif-3.gif','')
,('Wall Ball','Full Body','https://dl.airtable.com/tOqEs71CReQ9XSK15MwN_WallBallToss.gif','Toss the Medicine Ball in the air, or against a solid wall (concrete or brick) if available.')
,('Weighted Jumping Jacks','Full Body','https://dl.airtable.com/Ay4JNlvRqCCbLlKjwHWC_eec0a59a6eacdc9cfd19a13290516684.jpg','')
,('Weighted Punches','Core','https://dl.airtable.com/AZ5zCPLNRJBCx5CwWUwn_cross-punch-exercise-illustration.gif','')
,('Deadbug','Core','https://dl.airtable.com/Vwxt6KjRW62PrDrpTDSx_exAX6p.gif','Really good if you have lower back pain and want to do an ab workout');





INSERT INTO workouts(name, weight, sets, reps, username) VALUES ('Bench', '275 lbs', 5, 3, 'Kev'),
('Squat', '300 lbs', 5, 3, 'Kev'),
('Deadlift', '380 lbs', 5, 3, 'Kev'),
('Bench', '135 lbs', 5, 3, 'Kat'),
('Squat', '225 lbs', 5, 3, 'Kat'),
('Deadlift', '300 lbs', 5, 3, 'Kat'),
('Bench', '315 lbs', 4, 10, 'CBum'),
('Squat', '415 lbs', 5, 3, 'CBum'),
('Deadlift', '675 lbs', 5, 3, 'CBum');