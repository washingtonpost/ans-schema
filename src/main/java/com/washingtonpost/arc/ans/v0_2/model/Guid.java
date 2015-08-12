package com.washingtonpost.arc.ans.v0_2.model;

/**
 * Globally unique id
 */
public class Guid implements TraitGuid {

    private String guid;

    @Override
    public String getGuid() {
        return this.guid;
    }

    @Override
    public void setGuid(String guid) {
        this.guid = guid;
    }
}
