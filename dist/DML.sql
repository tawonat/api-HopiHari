-- esse arquivo dml serve pra abastecer a estrutura do banco de dados

-- Inserts pra atracoes
INSERT INTO atracoes (name, waiting_time, status, area) VALUES 
('Montanha Russa', 30, 'Operando', 'Aventura'),
('Roda Gigante', 15, 'Operando', 'Família'),
('Splash', 45, 'Manutenção', 'Água'),
('Trem Fantasma', 20, 'Operando', 'Terror'),
('Carrossel', 10, 'Operando', 'Infantil'),
('Elevador', 25, 'Operando', 'Radical'),
('Rapids', 35, 'Operando', 'Água');

-- Inserts pra users
INSERT INTO users (first_name, last_name, email, password, birth_date, phone) VALUES 
('João', 'Silva', 'joao@email.com', '$2b$10$4knEQXMTVlxt3zTE9yztZur3yKl0b/ctvkLsSGNABOPwFHQ1M4y.2', '1990-01-01', '11999999999'), --aqui eu to passando a senha criptografada já, mas as senhas são "senha123"
('Maria', 'Santos', 'maria@email.com', '$2b$10$WAiHYBoZcjld7XHTbvKnlOZqr6oQqUozW6RBcB1VePvXQpVYuscCO', '1995-05-15', '11988888888'), --"password456"
('Pedro', 'Oliveira', 'pedro@email.com', '$2b$10$WAiHYBoZcjld7XHTbvKnlOZqr6oQqUozW6RBcB1VePvXQpVYuscCO', '1988-12-30', '11977777777'); --"password789"

-- Inserts pra lines (fila)
INSERT INTO hopi_hari_db.lines (id_user, id_ride) VALUES 
-- Montanha Russa (ID 7)
(12, 7), --coloca o user com id 12 no brinquedo de id 7, assim por diante
(11, 7), --aqui ta colocando o user 11 no brinquedo 7 tambem, então ele esta junto com o 12
-- Roda Gigante (ID 8)
(12, 8),
(2, 8),
-- Splash (ID 9)
(12, 9),
(11, 9),
-- Trem Fantasma (ID 10)
(2, 10),
(12, 10),
-- Carrossel (ID 11)
(12, 11),
(11, 11),
-- Rapids (ID 13)
(11, 13),
(12, 13);

-- Inserts pra notificacoes
INSERT INTO notificacoes (description, id_rides, id_user, status) VALUES 
('Fila reduzida na Montanha Russa', 1, 1, 1),
('Splash voltou a funcionar', 3, 2, 1),
('Manutenção finalizada no Trem Fantasma', 4, 3, 0);


-- Query que lista as filas por brinquedo (Nome de usuário, ID usuário, ID do brinquedo, Nome do brinquedo)
SELECT
CONCAT(u.first_name, ' ', u.last_name) AS nome_usuario,
l.id_user AS id_usuario,
a.name AS nome_brinquedo,
l.id_ride AS id_brinquedo
FROM
hopi_hari_db.lines l
JOIN
hopi_hari_db.atracoes a ON l.id_ride = a.id
JOIN
hopi_hari_db.users u ON l.id_user = u.id