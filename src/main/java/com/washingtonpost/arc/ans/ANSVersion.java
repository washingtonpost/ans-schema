package com.washingtonpost.arc.ans;

/**
 * <p>A convenience enumeration of ANS Versions that could appear in an ANS document's "version" field</p>
 */
public enum ANSVersion {

    V0_2_0("0.2"),
    V0_3_0("0.3"),
    V0_3_1("0.3.1"),
    V0_3_2("0.3.2"),
    V0_3_3("0.3.3"),
    V0_4_0("0.4");

    private final String versionString;

    ANSVersion(String versionString) {
        this.versionString = versionString;
    }

    /**
     * @param versionString The string representation of a version to get an enum for
     * @return The corresponding ANSVersion for {@code versionString}, or {@code null} if {@code versionString} is null or empty
     * @throws IllegalArgumentException if there's no known ANSVersion Enum associated with {@code versionString}
     */
    public static ANSVersion fromString(String versionString) {
        if (versionString == null || versionString.isEmpty()) {
            // This functionality is just to be accomodating to users working with partial a context
            // who will often gin up a Story without 100% of the fields
            return null;
        }
        for (ANSVersion elem : ANSVersion.values()) {
            if (elem.versionString.equals(versionString)) {
                return elem;
            }
        }
        throw new IllegalArgumentException("No such ANSVersion enumeration as '" + versionString + "'");
    }

    @Override
    public String toString() {
        return this.versionString;
    }
}
