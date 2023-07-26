CREATE TABLE `Cart_detail`(
    `id` BIGINT NOT NULL,
    `cart_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `item_id` BIGINT NOT NULL,
    `amount` BIGINT NOT NULL
);
ALTER TABLE
    `Cart_detail` ADD PRIMARY KEY(`id`);
CREATE TABLE `Item`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price` BIGINT NOT NULL,
    `amount` BIGINT NOT NULL,
    `type` ENUM('') NOT NULL
);
ALTER TABLE
    `Item` ADD UNIQUE `item_name_unique`(`name`);
CREATE TABLE `Cart`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `state` TINYINT(1) NOT NULL
);
ALTER TABLE
    `Cart` ADD UNIQUE `cart_user_id_unique`(`user_id`);
CREATE TABLE `Option`(
    `id` BIGINT NOT NULL,
    `item_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `option_name` VARCHAR(255) NOT NULL,
    `option_price` BIGINT NOT NULL
);
ALTER TABLE
    `Option` ADD PRIMARY KEY(`id`);
CREATE TABLE `Order_item`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `item_id` BIGINT NOT NULL,
    `state` ENUM('') NOT NULL,
    `amount` BIGINT NOT NULL
);
ALTER TABLE
    `Cart_detail` ADD CONSTRAINT `cart_detail_cart_id_foreign` FOREIGN KEY(`cart_id`) REFERENCES `Cart`(`id`);
ALTER TABLE
    `Cart_detail` ADD CONSTRAINT `cart_detail_item_id_foreign` FOREIGN KEY(`item_id`) REFERENCES `Item`(`id`);
ALTER TABLE
    `Order_item` ADD CONSTRAINT `order_item_item_id_foreign` FOREIGN KEY(`item_id`) REFERENCES `Item`(`id`);
ALTER TABLE
    `Option` ADD CONSTRAINT `option_item_id_foreign` FOREIGN KEY(`item_id`) REFERENCES `Item`(`id`);