package com.washingtonpost.arc.ans.v0_3.model;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Gallery" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestGallery extends AbstractTest<Gallery> {
    
    @Override
    String getSchemaName() {
        return "gallery";
    }

    @Override
    Class getTargetClass() {
        return Gallery.class;
    }

    @Test
    @Override
    @SuppressWarnings("unchecked")
    public void testEqualsAndHashCode() {
        EqualsVerifier.forClass(getTargetClass())
                .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                .withRedefinedSuperclass()
                .verify();
    }

}

