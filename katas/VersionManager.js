const vm = (currentVersion) => {
    return new VersionManager(currentVersion);
}

class VersionManager {
    #majorVersion = 0;
    #minorVersion = 0;
    #patchVersion = 1;
    #versionHistory = [];

    constructor(version = '0.0.1') {
        let matches = version.match(/^(\w+\.)?(\w+\.)?(\w+)/g);
        if (matches != null) {
            let parts = matches[0].split('.', 3);
            try {
                this.#majorVersion = this.#parseIntThrow(parts[0]);
                this.#minorVersion = this.#parseIntThrow(parts[1]);
                this.#patchVersion = this.#parseIntThrow(parts[2]);
            } catch(e) {
                throw new Error('Error occured while parsing version!');
            }
        }
    }
    #parseIntThrow(value) {
        if (value === undefined) return 0;
        let intVal = parseInt(value);
        if (isNaN(intVal)) throw new Error("Not a valid sub-version value!");
        return intVal;
    }
    #saveState() {
        this.#versionHistory.push({
            major: this.#majorVersion,
            minor: this.#minorVersion,
            patch: this.#patchVersion
        });
    }
    release() {
        return `${this.#majorVersion}.${this.#minorVersion}.${this.#patchVersion}`;
    }
    major() {
        this.#saveState();
        this.#majorVersion++;
        this.#minorVersion = 0;
        this.#patchVersion = 0;
        return this;
    }
    minor = function() {
        this.#saveState();
        this.#minorVersion++;
        this.#patchVersion = 0;
        return this;
    }
    patch = function() {
        this.#saveState();
        this.#patchVersion++;
        return this;
    }
    rollback = function() {
        let prevVersion = this.#versionHistory.pop();
        if (prevVersion === undefined) {
            throw new Error("Cannot rollback!");
        }
        this.#majorVersion = prevVersion.major;
        this.#minorVersion = prevVersion.minor;
        this.#patchVersion = prevVersion.patch;
        return this;
    }

}