CREATE TABLE questions (
    ID SERIAL PRIMARY KEY,
    body TEXT,
    created_date TIMESTAMP
);


CREATE TABLE answers (
    ID SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    eth_address TEXT,
    is_yes BOOLEAN,
    created_date TIMESTAMP
);


INSERT INTO questions (body, created_date) VALUES ('Will Pontifex win the Token Hackathon? 🦁', now());
INSERT INTO questions (body, created_date) VALUES ('Will there be a new Caliph declared (that isn''t Al-Bagdadi) by December 31st 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Theresa May be Prime Minister on October 31st 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Twitter be acquired by August 31st?', now());
INSERT INTO questions (body, created_date) VALUES ('Will the TechCrunch Disrupt Hackathon (Sept 18th - Sept 20th) be won by a cryptocurrency related idea?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Ether''s price be $500 or above on September 1st at noon?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Scotland set a date for another referrendum by August 10th?', now());
INSERT INTO questions (body, created_date) VALUES ('Will the US GDP 2nd Quarter growth rate be 3% or greater?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Bitcoin Hard Fork in August(RE: UASF / BIP 148)?', now());
INSERT INTO questions (body, created_date) VALUES ('Will oil cost $50 per barrel by Aug 31st 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will the Brexit formally start by Nov 30th 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Slack be sold/acquired by Dec 31 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will the Financial Times do a Cover Page Story on Bitcoin by October 16th, 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will The Mummy reach $50 millions in the openning weekend? ', now());
INSERT INTO questions (body, created_date) VALUES ('Will Nicolas Maduro cease to be President of Venezuela by August 1st 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will the first human head  transplant by the mad scientist  Italian  Sergio Canavero be successful in December 2017? ', now());
INSERT INTO questions (body, created_date) VALUES ('Will a country other than the UK exit from the EU before 16 October?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Tesla deliver it''s first Model III by August 1st?', now());
INSERT INTO questions (body, created_date) VALUES ('Will OPEC cut production at their meeting on November 30th?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Canada legalise marijuana nationally before October 1 2017?', now());
INSERT INTO questions (body, created_date) VALUES ('Will a Democratic Candidate for US President declare before 2018?', now());
INSERT INTO questions (body, created_date) VALUES ('Will Germany''s 2017 legislative elections be majority one by the CDU/CSU?', now());
INSERT INTO questions (body, created_date) VALUES ('Will the Emperor of Japan abdicate by August 16th?', now());
INSERT INTO questions (body, created_date) VALUES ('Will there be a ICO/Crypto Crowd Sale that will exceed $100 million dollars in raised capital by August 1st?', now());
INSERT INTO questions (body, created_date) VALUES ('Will there be an announcement of a hack of an crytpo exchange amounting to $10 million dollars or more stolen by August 1st?', now());
