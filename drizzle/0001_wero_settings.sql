CREATE TABLE `wero_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`recipient_name` text DEFAULT '' NOT NULL,
	`phone_number` text DEFAULT '' NOT NULL,
	`enabled` integer DEFAULT 0 NOT NULL,
	`updated_at` text
);