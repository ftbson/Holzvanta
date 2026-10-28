ALTER TABLE `wero_settings` RENAME TO `bizum_settings`;
UPDATE `orders` SET `payment_method` = 'bizum' WHERE `payment_method` = 'wero';
CREATE TABLE `analytics_visits` (
	`id` text PRIMARY KEY NOT NULL,
	`visit_date` text NOT NULL,
	`country` text NOT NULL,
	`visits` integer DEFAULT 0 NOT NULL
);
