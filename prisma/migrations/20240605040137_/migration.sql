-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `loginId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `User_loginId_key`(`loginId`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSetting` (
    `id` VARCHAR(36) NOT NULL,
    `notificationsOn` BOOLEAN NOT NULL,
    `smsEnabled` BOOLEAN NOT NULL,
    `userLoginId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSetting_userLoginId_key`(`userLoginId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSetting` ADD CONSTRAINT `UserSetting_userLoginId_fkey` FOREIGN KEY (`userLoginId`) REFERENCES `User`(`loginId`) ON DELETE RESTRICT ON UPDATE CASCADE;
