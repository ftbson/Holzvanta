CREATE TABLE `bank_transfer_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`account_name` text DEFAULT '' NOT NULL,
	`iban` text DEFAULT '' NOT NULL,
	`bic` text DEFAULT '' NOT NULL,
	`enabled` integer DEFAULT 0 NOT NULL,
	`updated_at` text
);

