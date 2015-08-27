package com.washingtonpost.arc.ans.v0_3.model;

/**
 * Globally unique id
 */
public class Id implements TraitId {

    private String id;

    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }
}
